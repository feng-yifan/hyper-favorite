import Tag from '@domain/tag/Tag.ts';
import TagRepository from '@repository/TagRepository.ts';
import { TCustomFormItem } from '@typing.ts';
import { Select, SelectProps, Tag as AntdTag } from "antd";
import { ReactNode, useEffect, useState } from "react";
import reactStringReplace from "react-string-replace";

type TOption = Required<SelectProps>['options'][number] & { tag: Tag }

const BookmarkTags: TCustomFormItem<Tag[]> = (props) => {
  const [searchText, setSearchText] = useState('');
  const [keyWords, setKeyWords] = useState<string[]>([]);
  const [options, setOptions] = useState<TOption[]>([]);
  const [loading, setLoading] = useState(false);

  const convertSearchTextToKeyWords = (searchText: string): string[] => {
    return [...new Set(searchText.split(/\s+/).filter(word => word.length > 0))];
  };

  useEffect(() => {
    setKeyWords(convertSearchTextToKeyWords(searchText));
  }, [searchText]);

  const convertTagsToOptions = (tags: Tag[]): TOption[] => tags.map(tag => ({
    label: tag.fullName,
    value: tag.id,
    tag,
  }));

  // 通过关键字搜索标签
  useEffect(() => {
    setLoading(true);
    new TagRepository().getByKeyWords(keyWords)
      .then(convertTagsToOptions)
      .then(setOptions)
      .then(() => {
        setLoading(false);
      });
  }, [keyWords]);

  const renderOption: SelectProps['optionRender'] = (option) => {
    const nodes: ReactNode[] = [];
    const tagNames = (option.label as string).split('::');
    for (let i = 1, j = tagNames.length; i <= j; i++) {
      const tagName = tagNames[i - 1];
      nodes.push(<AntdTag className={'no-gap'} key={i * 2 - 1}>{highlightTagName(tagName)}</AntdTag>);
      if (i !== j) {
        nodes.push(<span key={i * 2}>::</span>);
      }
    }
    return nodes;
  };

  const highlightTagName = (tagName: string) => {
    if (keyWords.length === 0) {
      return tagName;
    }
    const regexp = new RegExp(`(${keyWords.join('|')})`, 'ig');
    return reactStringReplace(tagName, regexp, (match, i) => {
      return <span key={i} className={'highlight'}>{match}</span>;
    });
  };

  const onChange: SelectProps['onChange'] = (_, options) => {
    props.onChange?.(options.map((option: TOption) => option.tag));
  };

  return <>
    <Select
      allowClear
      filterOption={() => true}
      id={props.id}
      loading={loading}
      mode={'multiple'}
      notFoundContent={'输入名称搜索标签'}
      onChange={onChange}
      onSearch={setSearchText}
      options={options}
      optionRender={renderOption}
      searchValue={searchText}
      showSearch
    />
  </>;
};

export default BookmarkTags;
