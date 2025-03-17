import Header from "@/app/components/header";
import { currencyFormatter, percentageFormatter } from "@/app/format";

export default async function Loan({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}loans/${id}`,
    {
      method: "GET",
      headers: {
        "x-api-key": process.env.NEXT_PUBLIC_API_KEY!,
      },
    }
  );
  const data = await response.json();
  const loan = data[0];

  return (
    <>
      <Header />
      <div className="h-[36vh] w-[60%] mx-auto border-2 border-b-gray-600 rounded-md py-2 px-4">
        <div>
          <h2 className="text-2xl text-center">Loan Profile</h2>
        </div>
        <div className="flex justify-between items-center">
          <ul>
            <li>
              <b>ID:</b> {loan.id}
            </li>
            <li>
              <b>Pool ID:</b> {loan.poolId}
            </li>
            <li>
              <b>Loan ID:</b> {loan.loanId}
            </li>
            <li>
              <b>Pool:</b> {loan.pool}
            </li>
            <li>
              <b>Unpaid Principal:</b> {currencyFormatter(loan.unpaidPrincipal)}
            </li>
            <li>
              <b>Interest Rate:</b> {percentageFormatter(loan.interestRate)}
            </li>
            <li>
              <b>Principal Interest Payment:</b>{" "}
              {currencyFormatter(loan.principalInterestPayment)}
            </li>
            <li>
              <b>Property Value:</b> {currencyFormatter(loan.propertyValue)}
            </li>
          </ul>
          <ul>
            <li>
              <b>Original Principal:</b>{" "}
              {currencyFormatter(loan.originalPrincipal)}
            </li>
            <li>
              <b>Borrower Last Name:</b> {loan.borrowerLastName}
            </li>
            <li>
              <b>Borrwer First Name:</b> {loan.borrowerFirstName}
            </li>
            <li>
              <b>Property Street Address:</b> {loan.propertyStreetAddress}
            </li>
            <li>
              <b>Property City:</b> {loan.propertyCity}
            </li>
            <li>
              <b>Property State:</b> {loan.propertyState}
            </li>
            <li>
              <b>Property Zip:</b> {loan.propertyZip}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
