import { useState, useEffect } from "react";
import { db } from "../config/config";
import { collection, query, onSnapshot } from "firebase/firestore";
// import { useGetUserInfo } from "./useGetUserInfo";

export const useGetSteps = () => {
  const [steps, setSteps] = useState([]);
  // const { userid } = useGetUserInfo();
  const transref = collection(db, "steps");

  const getSteps = async () => {
    let document;
    try {
      const querySteps = query(transref);
      document = onSnapshot(querySteps, (snapshot) => {
        let docs = [];

        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;

          docs.push({ id, ...data });

          // console.log(totalExpense,totalIncome);
        });
        setSteps(docs);
      });
    } catch (err) {
      // console.log(err);
    }

    return () => document();
  };

  useEffect(() => {
    getSteps();
  });

  return { steps };
};
