
module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  const rpc = "https://api.mainnet-beta.solana.com";

  async function callSolana(method) {
    const response = await fetch(rpc, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method,
        params: []
      })
    });

    if (!response.ok) {
      throw new Error("Solana RPC request failed");
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    return data.result;
  }

  try {
    const [health, slot, epoch] =
      await Promise.all([
        callSolana("getHealth"),
        callSolana("getSlot"),
        callSolana("getEpochInfo")
      ]);

    return res.status(200).json({
      success: true,
      network: "Solana Mainnet",
      health,
      slot,
      epoch: {
        number: epoch.epoch,
        blockHeight: epoch.blockHeight,
        slotIndex: epoch.slotIndex,
        slotsInEpoch: epoch.slotsInEpoch,
        transactionCount: epoch.transactionCount
      },
      updatedAt: new Date().toISOString()
    });

  } catch (error) {
    return res.status(502).json({
      success: false,
      error: error.message
    });
  }
};
