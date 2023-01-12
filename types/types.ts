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
