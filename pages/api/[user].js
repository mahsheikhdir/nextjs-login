// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios"

export default async function helloAPI(req, res) {

  const { user } = req.query;
  console.log(process.env.LOGIN_END_POINT + "?" + user);
  //console.log(process.env.LOGIN_END_POINT)
  let responseData = await axios.get(process.env.LOGIN_END_POINT + "?email=" + user);
  //console.log(responseData.data);
  res.status(responseData.status).json(responseData.data);
  
}
