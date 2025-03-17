"use client";
import {
  Ref,
  RefAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { AgGridReact } from "ag-grid-react";
import getLoans from "./api/getLoans";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import getPools from "./api/getPools";
import { currencyColumnFormatter, percentageColumnFormatter } from "./format";
import getLoanData from "./api/getData";
import { Loan, LoanData, Pool } from "./types";
import { useRouter } from "next/navigation";
import Header from "./components/header";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function Home() {
  const loansGridRef = useRef<AgGridReact>(null);
  const loanDataGridRef = useRef<AgGridReact>(null);
  const [loans, setLoans] = useState<Loan[] | null>(null);
  const [pools, setPools] = useState<Pool[] | null>(null);
  const [loanData, setLoanData] = useState<LoanData[] | null>(null);
  const [currentPool, setCurrentPool] = useState<string>("");
  const router = useRouter();

  const loansGridOptions = {
    columnTypes: {
      currency: {
        valueFormatter: currencyColumnFormatter,
      },
      percentage: {
        valueFormatter: percentageColumnFormatter,
      },
    },
    columnDefs: [
      { field: "loanId", filter: "agTextFilter" },
      { field: "pool", filter: "agTextFilter" },
      { field: "unpaidPrincipal", filter: "agNumberFilter", type: "currency" },
      { field: "interestRate", filter: "agNumberFilter", type: "percentage" },
      {
        field: "principalInterestPayment",
        filter: "agNumberFilter",
        type: "currency",
      },
      { field: "propertyValue", filter: "agNumberFilter", type: "currency" },
      { field: "originationDate", filter: "agDateColumnFilter" },
      {
        field: "originalPrincipal",
        filter: "agNumberFilter",
        type: "currency",
      },
      { field: "borrowerLastName", filter: "agTextFilter" },
      { field: "borrowerFirstName", filter: "agTextFilter" },
      { field: "propertyStreetAddress", filter: "agTextFilter" },
      { field: "propertyCity", filter: "agTextFilter" },
      { field: "propertyState", filter: "agTextFilter" },
      { field: "propertyZip", filter: "agTextFilter" },
    ],
  };

  const loanDataGridOptions = {
    columnTypes: {
      currency: {
        valueFormatter: currencyColumnFormatter,
      },
      percentage: {
        valueFormatter: percentageColumnFormatter,
      },
    },
    columnDefs: [
      { field: "pool" },
      { field: "totalLoans" },
      {
        field: "totalUnpaidPrincipal",
        type: "currency",
      },
      {
        field: "averageInterestRate",
        type: "percentage",
      },
      {
        field: "totalPrincipalInterestPayment",
        type: "currency",
      },
      {
        field: "totalPropertyValue",
        type: "currency",
      },
      {
        field: "totalOriginalPrincipal",
        type: "currency",
      },
    ],
  };

  useEffect(() => {
    const _getLoans = async () => {
      const loans = await getLoans();
      if (loans) {
        setLoans(loans);
      }
    };

    _getLoans();
  }, []);

  useEffect(() => {
    const _getPools = async () => {
      const pools = await getPools();
      if (pools) {
        setPools(pools);
      }
    };

    _getPools();
  }, []);

  useEffect(() => {
    const _getLoanData = async () => {
      const loanData = await getLoanData();
      if (loanData) {
        const initialValue = 0;
        setLoanData(loanData);
      }
    };

    _getLoanData();
  }, []);

  const onBtnExport = useCallback((gridRef: any) => {
    gridRef.current!.api.exportDataAsCsv();
  }, []);
  return (
    <>
      <Header />
      <div className="w-[80%] h-[30vh] mx-auto">
        <div className="flex justify-between items-center mb-0.5">
          {pools ? (
            <div className="flex items-center">
              <h3 className="mr-2">Select a Pool</h3>
              <select
                name="currentPool"
                onChange={(event) => setCurrentPool(event.target.value)}
                className="border-solid border-2 border-gray-600 rounded-sm bg-white"
              >
                <option value="">All Pools</option>
                {pools.map((pool) => {
                  return (
                    <option key={pool.id} value={pool.name}>
                      {pool.name}
                    </option>
                  );
                })}
              </select>
            </div>
          ) : (
            <></>
          )}

          {loans ? (
            <>
              <h2 className="text-2xl">Loans</h2>
              <button
                onClick={() => onBtnExport(loansGridRef)}
                className="cursor-pointer hover:bg-white border-solid border-2 border-gray-600 rounded-sm p-2"
              >
                Download CSV export file
              </button>
            </>
          ) : (
            <></>
          )}
        </div>
        {loans ? (
          <>
            <AgGridReact
              gridId="loansGrid"
              ref={loansGridRef}
              rowData={
                currentPool
                  ? loans.filter((loan) => {
                      return currentPool === loan.pool;
                    })
                  : loans
              }
              gridOptions={loansGridOptions}
              onRowClicked={(event) => {
                router.push(`/loan/${event.data.id}`);
              }}
            />
            <p>Click on a column header to sort the table</p>
            <p className="mb-10">
              Click on the row of a loan to navigate to that loan page
            </p>
          </>
        ) : (
          <></>
        )}
        {loanData ? (
          <>
            <div className="flex justify-between items-center">
              <div className="w-48 h-4"></div>
              <h2 className="text-2xl">Loan Data</h2>
              <button
                className="cursor-pointer hover:bg-white border-solid border-2 border-gray-600 rounded-sm p-2"
                onClick={() => onBtnExport(loanDataGridRef)}
              >
                Download CSV export file
              </button>
            </div>
            <AgGridReact
              gridId="loanSummaryGrid"
              ref={loanDataGridRef}
              rowData={
                currentPool
                  ? loanData.filter((data) => {
                      return currentPool === data.pool;
                    })
                  : loanData
              }
              gridOptions={loanDataGridOptions}
            />
            <p className="mb-4">Click on a column header to sort the table</p>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
