import Tag from '@domain/tag/Tag.ts';
import TagRepository from '@repository/TagRepository.ts';
import { Tree, TreeDataNode } from "antd";
import { useEffect, useState } from "react";

type TTagTreeNode = TreeDataNode & {
  tag: Tag
  children?: TTagTreeNode[]
};

const TagTree = () => {
  const [treeNodes, setTreeNodes] = useState<TTagTreeNode[]>([]);

  const hasSubTag = (tag: Tag): boolean => {
    return tag.left + 1 !== tag.right;
  };

  const convertTagToTreeNode = (tag: Tag): TTagTreeNode => ({
    title: `${tag.name}(${tag.id})`,
    key: tag.id,
    isLeaf: !hasSubTag(tag),
    tag,
  });

  const updateTreeData = (nodes: TTagTreeNode[], tagId: number, subNodes: TTagTreeNode[]): TTagTreeNode[] => {
    return nodes.map(node => {
      if (node.tag.id === tagId) {
        return {...node, children: subNodes};
      }
      if (node.children) {
        return {...node, children: updateTreeData(node.children, tagId, subNodes)};
      }
      return node;
    });
  };

  const loadSubTagToTree = async (node: TTagTreeNode) => {
    const tags = await new TagRepository().getByParentId(node.tag.id);
    const nodes = tags.map(convertTagToTreeNode);
    setTreeNodes(treeNodes => updateTreeData(treeNodes, node.tag.id, nodes));
  };

  useEffect(() => {
    new TagRepository().getByLevel(1)
      .then(tags => tags.map(convertTagToTreeNode))
      .then(data => setTreeNodes(data));
  }, []);

  return <>
    <Tree
      loadData={loadSubTagToTree}
      showLine
      treeData={treeNodes}
    />
  </>;
};
export default TagTree;
