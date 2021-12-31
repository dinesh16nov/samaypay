import * as internal from "assert";

//#region OpType
export interface OpTypeResp {
    data: OpTypeRespData;
    statuscode: number;
    msg: string;
    isVersionValid: boolean;
    isAppValid: boolean;
    checkID: number;
    isPasswordExpired: boolean;
    mobileNo?: any;
    emailID?: any;
    isLookUpFromAPI: boolean;
  }
  
  export interface OpTypeRespData {
    assignedOpTypes: AssignedOpType[];
  }
  
  interface AssignedOpType {
    serviceID: number;
    name: string;
    isActive: boolean;
  }
//#endregion

//#region Login
export interface LoginResp
{
    data: LoginData;
    checkID: number;
    emailID: string;
    isAppValid: boolean;
    isDTHInfo: boolean;
    isHeavyRefresh: boolean;
    isLookUpFromAPI: boolean;
    isPasswordExpired: boolean;
    isRoffer: boolean;
    isVersionValid: boolean;
    mobileNo: string;
    msg: string;
    statuscode: number;
}
interface LoginData {
  userID: number;
  name: string;
  mobileNo: string;
  sessionID: number;
  roleName: string;
  roleID: number;
  slabID: number;
  loginTypeID: number;
  emailID: string;
  session: string;
  outletID: number;
  isDoubleFactor: boolean;
  isPinRequired: boolean;
}
//#endregion

//#region SignUp
export interface SignUpResp {
  statuscode: number;
  msg: string;
  isVersionValid: boolean;
  isAppValid: boolean;
  checkID: number;
  isPasswordExpired: boolean;
  mobileNo?: any;
  emailID?: any;
  isLookUpFromAPI: boolean;
  isDTHInfoCall: boolean;
  isShowPDFPlan: boolean;
  sid?: any;
  isOTPRequired: boolean;
  getID: number;
}
//#endregion

//#region Start Number List
export interface NumberListResp {
    data: NumberListRespData;
    statuscode: number;
    msg: string;
    isVersionValid: boolean;
    isAppValid: boolean;
    checkID: number;
    isPasswordExpired: boolean;
    mobileNo?: any;
    emailID?: any;
    isLookUpFromAPI: boolean;
  }
  export interface CompanyProfileDetail{
    statuscode:number,
    msg:string,
    name:string,
    address:string,
    emailId:string,
    phoneNo:string,
    mobileNo:string,
    mobileNo2:string,
    accountMobileNo:string,
    accountEmailId:string,
    facebook:string,
    instagram:string,
    twitter:string,
    whatsApp:string,
    website:string,
    paymentEnquiry:string,
    customerCareMobileNos:string,
    customerCareEmailIds:string,
    customerPhoneNos:string,
    customerWhatsAppNos:string,
    accountPhoneNos:string,
    accountWhatsAppNos:string,
    salesPersonNo:string,
    salesPersonEmail:string
  }
  interface NumberListRespData {
    numSeries: NumSery[];
    operators: Operator[];
    cirlces: Cirlce[];
  }
  
  interface Cirlce {
    id: number;
    circle: string;
  }
  
  interface Operator {
    name: string;
    oid: number;
    operator?: any;
    tollFree: string;
    opType: number;
    isBBPS: boolean;
    isBilling: boolean;
    min: number;
    max: number;
    length: number;
    lengthMax: number;
    startWith: string;
    image: string;
    isPartial: boolean;
    accountName: string;
    accountRemak: string;
    isAccountNumeric: boolean;
    isGroupLeader: boolean;
    commSettingType: number;
    minRange: number;
    maxRange: number;
    rangeId: number;
  }
  
  interface NumSery {
    oid: number;
    series: number;
    circleCode: number;
    circleID: number;
    circle?: any;
    number?: any;
  }
//#endregion
  

//#region BalanceResp
export interface PGInitiatePGResponse{
  statuscode:number;
  msg:string;
  status:number;
  pGModelForWeb:PGModelForRedirection;
}
export interface  WebMemberTypeModel{
  statuscode:number;
  msg:string;
  memberTypes:MembershipmasterB2C[];
}
export interface MembershipmasterB2C{
  isIDActive:boolean;
  id:number;
  memberShipType:string;
  couponCount:number;
  couponValue:number;
  isCouponAllowed:boolean;
  remark:string;
  couponValidityDays:number;
  cost:number;
}
export interface WebAppUserProfileResp{
  statuscode:number;
  msg:string;
  name:string;
  outletName:string;
  emailID:string;
  mobileNo:string;
  alternateMobile:string;
  dob:string;
  pan:string;
  pincode:string;
  city:string;
  state:string;
  address:string;
}
export interface PGModelForRedirection{
  tid:number,
  pgType:number;
  statuscode:number;
  msg:string;
  url:string;
  keyVals:[][];

  rPayRequest:RazorpayRequest;
  paytmJSRequest:PaytmJSRequest;
}
export interface RazorpayRequest
  {
      key_id: string,
      order_id:string,
      name:string,
      description:string,
      image:string,
      prefill_name:string,
      prefill_contact:string,
      prefill_email:string,
      callback_url:string,
      cancel_url:string,
      amount:string
  }
  export interface PaytmJSRequest
  {
    orderID:string,
     amount:string,
     tokenType:string,
      token:string,
      mid:string
      payMode:string
  }
export interface BalanceResp {
  data: BalanceDataResp;
  statuscode: number;
  msg: string;
  isVersionValid: boolean;
  isAppValid: boolean;
  checkID: number;
  isPasswordExpired: boolean;
  mobileNo?: any;
  emailID?: any;
  isLookUpFromAPI: boolean;
  isDTHInfoCall: boolean;
  isShowPDFPlan: boolean;
  sid?: any;
  isOTPRequired: boolean;
  getID: number;
}

interface BalanceDataResp {
  balance: number;
  bCapping: number;
  isBalance: boolean;
  isBalanceFund: boolean;
  uBalance: number;
  uCapping: number;
  isUBalance: boolean;
  isUBalanceFund: boolean;
  bBalance: number;
  bbCapping: number;
  isBBalance: boolean;
  isBBalanceFund: boolean;
  cBalance: number;
  cCapping: number;
  isCBalance: boolean;
  isCBalanceFund: boolean;
  idBalnace: number;
  idCapping: number;
  isIDBalance: boolean;
  isIDBalanceFund: boolean;
  pacakgeBalance: number;
  packageCapping: number;
  isPacakgeBalance: boolean;
  isPacakgeBalanceFund: boolean;
  isP: boolean;
  isPN: boolean;
  commRate: number;
}

//#endregion

//#region  Report
export interface RechargeReportResp {
  rechargeReport: RechargeReportData[];
  dmtReport?: any;
  ledgerReport?: any;
  userDaybookReport?: any;
  userDaybookDMRReport?: any;
  fundDCReport?: any;
  fundOrderReport?: any;
  slabCommissions?: any;
  slabDetailDisplayLvl?: any;
  userList?: any;
  childRoles?: any;
  fundRequestForApproval?: any;
  newsContent?: any;
  banners?: any;
  notifications?: any;
  refundLog?: any;
  companyProfile?: any;
  statuscode: number;
  msg: string;
  isVersionValid: boolean;
  isAppValid: boolean;
  checkID: number;
  isPasswordExpired: boolean;
  mobileNo?: any;
  emailID?: any;
  isLookUpFromAPI: boolean;
  isDTHInfoCall: boolean;
  isShowPDFPlan: boolean;
  sid?: any;
  isOTPRequired: boolean;
  getID: number;
}

interface RechargeReportData {
  _ServiceID: number;
  tid: number;
  transactionID: string;
  prefix?: any;
  userID: number;
  role?: any;
  outletNo: string;
  outlet: string;
  account: string;
  oid: number;
  operator: string;
  lastBalance: number;
  requestedAmount: number;
  amount: number;
  balance: number;
  slabCommType: string;
  commission: number;
  entryDate: string;
  api: string;
  liveID: string;
  _Type: number;
  type_: string;
  vendorID: string;
  apiRequestID: string;
  modifyDate: string;
  optional1: string;
  optional2: string;
  optional3: string;
  optional4: string;
  display1: string;
  display2: string;
  display3: string;
  display4: string;
  refundStatus: number;
  refundStatus_: string;
  isWTR: boolean;
  commType: boolean;
  gstAmount: number;
  tdsAmount: number;
  customerNo?: any;
  ccName: string;
  ccMobile: string;
  requestMode: string;
}
//#endregion

export interface CouponDetail{
  id:number;
  couponCode:string;
  couponExpiry:string;
  redeemDate:string;
  isRedeemed:boolean;
  couponValue:number;
}
//#region  Transection
export interface TransectionResp {
  liveID: string;
  transactionID: string;
  statuscode: number;
  msg: string;
  isVersionValid: boolean;
  isAppValid: boolean;
  checkID: number;
  isPasswordExpired: boolean;
  mobileNo?: any;
  emailID?: any;
  isLookUpFromAPI: boolean;
  isDTHInfoCall: boolean;
  isShowPDFPlan: boolean;
  sid?: any;
  isOTPRequired: boolean;
  getID: number;
}
//#endregion