import {TableHeader} from '../data/table-header';

export const tableHeader = (data: any): TableHeader[] => {
  if (!data?.content?.[0]) return [];

  return Object.keys(data.content[0])
    .filter(key => key !== 'index') // 🛑 Skip 'index' key
    .map((key): TableHeader => {
      const header = key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase());

      return {
        key: key,
        header: header.trim(),
        show: true,
        sortable: true,
        className: '',
        direction:''
      };
    });
};

