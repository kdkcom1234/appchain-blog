import { Client } from "../../ts-client"
import { AccountData, DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";

// const mnemonic =
//   "play butter frown city voyage pupil rabbit wheat thrive mind skate turkey helmet thrive door either differ gate exhibit impose city swallow goat faint";
// const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic);

const client = new Client(
  {
    apiURL: "http://localhost:1317",
    rpcURL: "http://localhost:26657",
    prefix: "cosmos",
  },
  // wallet
);

// const account = (await wallet.getAccounts())[0]

let account: AccountData | undefined;

document.querySelector("#connect")?.addEventListener("click", async () => {
  await client.useKeplr()
  const accounts = (await client.signer?.getAccounts())
  account = accounts ? accounts[0] : undefined
  console.log(client.signer?.getAccounts)

  console.log(account);

  const balances = await client.CosmosBankV1Beta1.query.queryAllBalances(account!.address);
  console.log(balances.data);
})

document.querySelector("#post")?.addEventListener("click", async () => {
  const tx = await client.BlogBlog.tx.sendMsgCreatePost(
    {
      value:
      {
        title: (document.querySelector("#title") as HTMLInputElement).value,
        body: (document.querySelector("#body") as HTMLTextAreaElement).value,
        // creator와 signer pubkey 비교함
        creator: account!.address
      }
    }
  )
  console.log(tx.msgResponses);

  const list = await client.BlogBlog.query.queryListPost();
  console.log(list.data);
})







