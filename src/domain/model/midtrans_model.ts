export type MidtransModel = {
    payment_type: string;
    bank_transfer?: BankTransfer; 
    transaction_details: TransactionDetail;
    echannel?: Echannel;
};

export type BankTransfer = {
    bank: string;
}

export type Echannel = {
    bill_info1: string;
    bill_info2: string;
}

export type TransactionDetail = {
    order_id: string;
    gross_amount: number;
}

export type ChargeResponse = {
    status_code: string;
    status_message: string;
    transaction_id: string;
    oder_id: string;
    gross_amount: string;
    transaction_status: string;

    permata_va_number?: string; 
    va_numbers?: VaNumbers;
}

export type VaNumbers = {
    bank: string;
    va_number: string;
}