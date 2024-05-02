import { Client } from "../../ts-client"
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";

const mnemonic =
  "play butter frown city voyage pupil rabbit wheat thrive mind skate turkey helmet thrive door either differ gate exhibit impose city swallow goat faint";
const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic);

const client = new Client(
  {
    apiURL: "http://localhost:1317",
    rpcURL: "http://localhost:26657",
    prefix: "cosmos",
  },
  wallet
);

const account = (await wallet.getAccounts())[0]
console.log(account);

const balances = await client.CosmosBankV1Beta1.query.queryAllBalances(account.address);
console.log(balances.data);

// const tx = await client.BlogBlog.tx.sendMsgCreatePost(
//   {
//     value:
//       // creator와 signer pubkey 비교함
//       { title: "test", body: "test1234", creator: account.address }
//   }
// )
// console.log(tx.msgResponses);

const list = await client.BlogBlog.query.queryListPost();
console.log(list.data);


