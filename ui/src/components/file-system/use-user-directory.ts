import { useEffect, useState } from 'react';

export default function useUserDirectory() {
  const [userDirectory, setUserDirectory] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setUserDirectory(returnData());
    setLoading(false);
  }, []);

  return [loading, userDirectory];
}

function returnData() {
  const data = [
    {
      isFolder: true,
      path: [],
      itemName: 'aaa',
      lastModified: '2/17/2021 7:02:12 PM',
    },
    {
      isFolder: true,
      path: ['aaa'],
      itemName: 'aaabbb',
      lastModified: '2/17/2021 7:02:33 PM',
    },
    {
      isFolder: true,
      path: ['aaa', 'aaabbb'],
      itemName: 'aaaaaabbbbbb',
      lastModified: '2/17/2021 7:02:40 PM',
    },
    {
      isFolder: true,
      path: ['aaa', 'aaabbb'],
      itemName: 'asdfasdfasdf',
      lastModified: '2/17/2021 7:15:40 PM',
    },
    {
      isFolder: false,
      path: ['aaa', 'aaabbb'],
      itemName: 'corner1.png',
      lastModified: '2/19/2021 11:08:36 AM',
      size: '525 KB',
    },
    {
      isFolder: false,
      path: ['aaa', 'aaabbb'],
      itemName: 'gray.png',
      lastModified: '2/19/2021 11:08:37 AM',
      size: '250 KB',
    },
    {
      isFolder: true,
      path: ['aaa'],
      itemName: 'aacccacaca',
      lastModified: '2/17/2021 7:15:35 PM',
    },
    {
      isFolder: false,
      path: ['aaa'],
      itemName: 'eeeeeeeeeeeeeeeeeeeeeeeee.png',
      lastModified: '2/19/2021 11:08:25 AM',
      size: '192 KB',
    },
    {
      isFolder: false,
      path: [],
      itemName: 'asdf.txt',
      lastModified: '2/17/2021 3:40:11 PM',
      size: '565 KB',
    },
    {
      isFolder: true,
      path: [],
      itemName: 'bbb',
      lastModified: '2/17/2021 7:02:18 PM',
    },
    {
      isFolder: true,
      path: ['bbb'],
      itemName: 'bb',
      lastModified: '2/17/2021 7:02:50 PM',
    },
    {
      isFolder: false,
      path: [],
      itemName: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.png',
      lastModified: '2/19/2021 11:08:17 AM',
      size: '188 KB',
    },
  ];
  return data;
}
