import axios from "axios";

const getPools = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}pools`,
      {
        headers: { "x-api-key": process.env.NEXT_PUBLIC_API_KEY },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default getPools;
