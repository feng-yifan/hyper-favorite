import { useEffect, useState } from "react";

export type TProtocol = 'https' | 'http' | string
export type TParam = { value: string, enable: boolean }
export type THash = TParam | null

const getProtocol = (protocol: string): TProtocol => protocol.substring(0, protocol.length - 1);

const getHash = (hash: string): THash | null => hash === '' ? null : {value: hash, enable: true};

const getParams = (searchParams: URLSearchParams): TParam[] => {
  const params = [];
  for (const [key, value] of searchParams.entries()) {
    params.push({value: `${key}=${value}`, enable: true});
  }
  return params;
};

const usePath = (path: string) => {
  const [url, setUrl] = useState(new URL(path));
  const [newPath, setNewPath] = useState(path);
  const [protocol, setProtocol] = useState(getProtocol(url.protocol));
  const [resource, setResource] = useState(url.host + url.pathname);
  const [params, setParams] = useState(getParams(url.searchParams));
  const [hash, setHash] = useState(getHash(url.hash));

  const getFullPath = () => {
    let fullPath = `${protocol}://${resource}`;
    const fullParams = [];
    for (const param of params) {
      if (param.enable) {
        fullParams.push(param.value);
      }
    }
    if (fullParams.length > 0) {
      fullPath = `${fullPath}?${fullParams.join('&')}`;
    }
    if (hash?.enable) {
      fullPath = `${fullPath}${hash.value}`;
    }
    return fullPath;
  };

  useEffect(() => {
    setNewPath(getFullPath());
  }, [protocol, resource, params, hash]);

  useEffect(() => {
    setProtocol(getProtocol(url.protocol));
    setResource(url.host + url.pathname);
    setParams(getParams(url.searchParams));
    setHash(getHash(url.hash));
  }, [url]);

  return {
    setUrl,
    protocol,
    setProtocol,
    resource,
    setResource,
    params,
    setParams,
    hash,
    setHash,
    fullPath: newPath,
    setFullPath: setNewPath,
  };
};

export default usePath;
