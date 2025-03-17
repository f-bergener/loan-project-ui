import axios from "axios";

const getLoans = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}loans`,
      {
        headers: { "x-api-key": process.env.NEXT_PUBLIC_API_KEY },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default getLoans;
