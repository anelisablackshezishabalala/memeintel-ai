
module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      error: "GET requests only"
    });
  }

  return res.status(200).json({
    success: true,
    mode: "EDUCATIONAL_DEMO",
    message: "Illustrative data only. Not live market data.",
    tokens: [
      {
        name: "Sample Coin Alpha",
        symbol: "SAMPLE1",
        examplePrice: 0.001,
        exampleVolume: 12000,
        riskStatus: "Unverified"
      },
      {
        name: "Sample Coin Beta",
        symbol: "SAMPLE2",
        examplePrice: 0.004,
        exampleVolume: 8500,
        riskStatus: "Unverified"
      },
      {
        name: "Sample Coin Gamma",
        symbol: "SAMPLE3",
        examplePrice: 0.0005,
        exampleVolume: 4200,
        riskStatus: "Unverified"
      }
    ],
    updatedAt: new Date().toISOString()
  });
};
