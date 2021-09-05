import { FC } from 'react';
import MultiColFilterTable from './components/MultiColFilterTable';

const MemberList: FC = () => {
  return (
    <div className="MemberList-page">
      {/* 多列可切换过滤表格 */}
      <MultiColFilterTable />
    </div>
  );
};

export default MemberList;
