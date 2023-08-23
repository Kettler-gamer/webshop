import orderService from "../services/orderService.js";

function getOrders(req, res) {
  console.log("Get orders route");
  const { jwtPayload } = req;

  orderService
    .getOrders(jwtPayload.username)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ message: "Something went wrong!" });
    });
}

export default { getOrders };
