import {
  Account,
  Connection,
  PublicKey,
  TransactionInstruction,
} from '@solana/web3.js'

import * as serum from '@project-serum/common'
import { IWallet } from './api'

export const withCreateSplTokenAccount = async (
  connection: Connection,
  wallet: IWallet | undefined,
  instructions: TransactionInstruction[],
  signers: Account[],
  mint: PublicKey
): Promise<{ tokenAccountAddress: PublicKey }> => {
  const tokenAccount = new Account()
  const provider = new serum.Provider(
    connection,
    wallet as serum.Wallet,
    serum.Provider.defaultOptions()
  )
  instructions.push(
    ...(await serum.createTokenAccountInstrs(
      provider,
      tokenAccount.publicKey,
      mint,
      wallet!.publicKey!
    ))
  )
  signers.push(tokenAccount)
  return { tokenAccountAddress: tokenAccount.publicKey }
}
