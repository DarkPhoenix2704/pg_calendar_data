import { fakerEN as faker } from "@faker-js/faker";



const insertData = async (data) => {

const x = (
  await fetch(
    "http://localhost:8080/api/v1/db/data/noco/p42xas2os91jlzg/mgkqxde5eldv1s9",
    {
      method: "POST",
      headers: {
        accept: "application/json, text/plain, */*",
        "xc-auth":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuYmFyYXN1bjEyM0BnbWFpbC5jb20iLCJkaXNwbGF5X25hbWUiOm51bGwsImF2YXRhciI6bnVsbCwidXNlcl9uYW1lIjpudWxsLCJpZCI6InVzY3NzY3pvbzZmaG9uanAiLCJyb2xlcyI6Im9yZy1sZXZlbC12aWV3ZXIiLCJ0b2tlbl92ZXJzaW9uIjoiZWE0Mzg2ODJkMWE3NTQ4N2JhZTk2MTE3OWJjZWI3MmQ4YWUzNjEzZTk1ZThlODA4ZmYwOTExZDIxYTUwNjNlMDFlZjQ4ZGQxZDA1ZDA5NjciLCJpYXQiOjE3MDM2NDg5ODMsImV4cCI6MTcwMzY4NDk4M30.NpfuNW1BiNOE4NESqIfXfrcQoxeijT5sGwjTgn23iW4",
        "xc-gui": "true",
        "cache-control": "no-cache",
        "content-type": "application/json",
        "nc-client-id": "018b3ecd-6a5c-7966-b56f-4eb4a20772b1",
      },
      body: JSON.stringify(data),
    }
  )
).json();
    return x
}


const getRandomTime = () => {
  const hours = Math.floor(Math.random() * 24);
  const minutes = Math.floor(Math.random() * 60);
  const seconds = Math.floor(Math.random() * 60);

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

const getDate = () => {
  const x = Math.floor(Math.random() * 20);

  const dateMap = [
    "2023-12-21",
    "2023-12-22",
    "2023-12-23",
    "2023-12-24",
    "2023-12-25",
    "2023-12-26",
    "2023-12-27",
  ];

  const randomDate = dateMap[x];
  const randomTime = getRandomTime();

  return `${randomDate} ${randomTime}+00:00`;
};


const dataPromises = Array(1000)
  .fill(0)
  .map(async () => {
    const result = await insertData({
      Title: faker.person.firstName(),
      Date: getDate(),
    });
    return result;
  });

// Use Promise.all to wait for all promises to resolve
Promise.all(dataPromises)
  .then((results) => {
    results.forEach((result) => {
      console.log(result);
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });
