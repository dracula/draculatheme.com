interface TableProps {
  children: React.ReactNode;
}

export const Table = ({ children }: TableProps) => (
  <div className="table-wrapper">
    <table>{children}</table>
  </div>
);
