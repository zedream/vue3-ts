export const enum StorageTypes {
  APP_STORE_ACCOUNT_LOCAL = 'app_store_account',
  APP_STORE_CORPS_LOCAL = 'app_store_corps',
  APP_STORE_TOKEN_LOCAL = 'app_store_token',
  APP_STORE_UID_LOCAL = 'app_store_uid',
  APP_STORE_SELLER_ID_LOCAL = 'app_store_seller_id',
  APP_STORE_COMMON_LOCK = 'app_store_common_lock',
  APP_STORE_COMMON_LOCK_PWD = 'app_store_common_lock_pwd',
  APP_STORE_COMMON_LOCK_MSG = 'app_store_common_lock_msg',
  APP_STORE_SETTLED_STATE_SESSION = 'app_store_settled_state',
  APP_STORE_MENU_TAG_TAGS_SESSION = 'app_store_menu_tag_tags',
  APP_TEMP_SETTLED_CORP_SESSION = 'app_temp_settled_corp'
}

export const enum StorageExpire {
  Day = 24 * 60 * 60 * 1000,
  Week = 7 * 24 * 60 * 60 * 1000,
  Month = 30 * 24 * 60 * 60 * 1000,
  Year = 365 * 24 * 60 * 60 * 1000
}
