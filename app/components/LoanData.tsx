"use client";
import { useEffect } from "react";

export default async function LoanData({ id }: { id: string }) {
  useEffect(() => {
    console.log(id);
  }, [id]);
  return (
    <div style={{ height: "50vh", width: "80%" }}>{id ? id : "Loading"}</div>
  );
}
