import { Dispatch, useEffect, useState } from 'react';

export type TProtocol = 'https' | 'http' | string
export type TParam = { value: string, enable: boolean }
export type THash = TParam
export type TExport<T> = { value: T, setter: Dispatch<T>, default: T }

const useBookmarkUrl = (_fullPath: string): {
  protocol: TExport<TProtocol>
  path: TExport<string>
  params: TExport<TParam[]>
  hash: TExport<THash>
  fullPath: string
  reset: () => void
} => {
  const url = new URL(_fullPath);

  const defaultProtocol: TProtocol = url.protocol.substring(0, url.protocol.length - 1);
  const [protocol, setProtocol] = useState<TProtocol>(defaultProtocol);

  const defaultParams: TParam[] = Array.from(url.searchParams.entries()).map((value): TParam => ({
    value: `${value[0]}=${value[1]}`,
    enable: true,
  }));
  const [params, setParams] = useState<TParam[]>(defaultParams);

  const defaultPath = url.host + url.pathname;
  const [path, setPath] = useState<string>(defaultPath);

  const defaultHash: THash = {value: url.hash, enable: true};
  const [hash, setHash] = useState<THash>(defaultHash);

  const [fullPath, setFullPath] = useState(_fullPath);

  const makeFullPath = (protocol: TProtocol, path: string, params: TParam[], hash: THash) => {
    let newFullPath = `${protocol}://${path}`;
    if (params.length > 0) {
      newFullPath += '?' + params.filter(param => param.enable).join('&');
    }
    if (hash.enable) {
      newFullPath += hash.value;
    }
    return newFullPath;
  };

  const reset = () => {
    setProtocol(defaultProtocol);
    setPath(defaultPath);
    setParams(defaultParams);
    setHash(defaultHash);
  };

  useEffect(() => {
    setFullPath(makeFullPath(protocol, path, params, hash));
  }, [protocol, path, params, hash]);

  return {
    protocol: {value: protocol, setter: setProtocol, default: defaultProtocol},
    path: {value: path, setter: setPath, default: defaultPath},
    params: {value: params, setter: setParams, default: defaultParams},
    hash: {value: hash, setter: setHash, default: defaultHash},
    fullPath,
    reset,
  };
};

export default useBookmarkUrl;
