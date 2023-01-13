export type DataBaseType = [
  {
    year: number;
    months: [
      {
        month: string;
        wishfullAverageLength: number;
        planOps: number;
        ops?: [
          {
            id?: string;
            date: string;
            department: number;
            number: string;
            field: string;
            duration?: number;
            result: [
              {
                isFinal: boolean;
                dateTime: string;
                debitMass: number;
                density: number;
                watterRate: number;
                files?: [string];
              }
            ];
          }
        ];
      }
    ];
  }
];

export type SingleYearType = {
  year: number;
  months: [
    {
      month: string;
      wishfullAverageLength: number;
      planOps: number;
      ops?: [
        {
          id?: string;
          date: string;
          department: number;
          number: string;
          field: string;
          duration?: number;
          result: [
            {
              isFinal: boolean;
              dateTime: string;
              debitMass: number;
              density: number;
              watterRate: number;
              files?: [string];
            }
          ];
        }
      ];
    }
  ];
};

export type MonthsArrayType = [
  {
    month: string;
    wishfullAverageLength: number;
    planOps: number;
    ops?: [
      {
        id?: string;
        date: string;
        department: number;
        number: string;
        field: string;
        duration?: number;
        result: [
          {
            isFinal: boolean;
            dateTime: string;
            debitMass: number;
            density: number;
            watterRate: number;
            files?: [string];
          }
        ];
      }
    ];
  }
];

export type SingleMonthType = {
  month: string;
  wishfullAverageLength: number;
  planOps: number;
  ops?: [
    {
      id?: string;
      date: string;
      department: number;
      number: string;
      field: string;
      duration?: number;
      result: [
        {
          isFinal: boolean;
          dateTime: string;
          debitMass: number;
          density: number;
          watterRate: number;
          files?: [string];
        }
      ];
    }
  ];
};

export type OpsArrayType = [
  {
    id?: string;
    date: string;
    department: number;
    number: string;
    field: string;
    duration?: number;
    result: [
      {
        isFinal: boolean;
        dateTime: string;
        debitMass: number;
        density: number;
        watterRate: number;
        files?: [string];
      }
    ];
  }
];

export type SingleOpType = {
  id?: string;
  date: string;
  department: number;
  number: string;
  field: string;
  duration?: number;
  result: [
    {
      isFinal: boolean;
      dateTime: string;
      debitMass: number;
      density: number;
      watterRate: number;
      files?: [string];
    }
  ];
};

export type ResultArrayType = [
  {
    isFinal: boolean;
    dateTime: string;
    debitMass: number;
    density: number;
    watterRate: number;
    files?: [string];
  }
];

export type SingleResultType = {
  isFinal: boolean;
  dateTime: string;
  debitMass: number;
  density: number;
  watterRate: number;
  files?: [string];
};
