export interface IPager {
  currentPage  : number;
  pages        : number[];
  totalPages   : number;

  startPage    : number;
  endPage      : number
}


export interface IPagerFilter {
  limit:         number;
  filter:        string;
  active:        boolean;
  order:         string;
}
