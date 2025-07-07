import { ClerkWebhookEvent } from "./event"

export type ClerkWebhookUserCreateEvent =  ClerkWebhookEvent & {
  data: Data
}

export type Data = {
  birthday: string
  created_at: number
  email_addresses: EmailAddress[]
  external_accounts: unknown[]
  external_id: string
  first_name: string
  gender: string
  id: string
  image_url: string
  last_name: string
  last_sign_in_at: number
  object: string
  password_enabled: boolean
  phone_numbers: unknown[]
  primary_email_address_id: string
  primary_phone_number_id: unknown
  primary_web3_wallet_id: unknown
  private_metadata: unknown
  profile_image_url: string
  public_metadata: unknown
  two_factor_enabled: boolean
  unsafe_metadata: unknown
  updated_at: number
  username: unknown
  web3_wallets: unknown[]
}

export type EmailAddress = {
  email_address: string
  id: string
  linked_to: unknown[]
  object: string
  verification: Verification
}

export type Verification = {
  status: string
  strategy: string
}