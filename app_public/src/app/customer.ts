export class QuoteItem {
    product: string;
    quantity: number;
    productAmount: number;
    description: string;
    summary: string;
    productExpense: number;
}

export class QuoteItem2 {
    panel: string;
    quantityP: number;
    panelAmount: number;
    inverter: string;
    quantityI: number;
    inverterAmount: number;
    roof: string;
    quantityR: number;
    roofAmount: number;
    pvAmount: number;
    description: string;
    summary: string;
    panelExpense: number;
    inverterExpense: number;
    roofExpense: number;
    roofDescription: string;
    panelDescription: string
    invDescription;

}

export class Quote {
    _id: string;
    quoteItems: QuoteItem[];
    summary: string;
    amount: number;
    expense: number;
    profit: number;
    flagged: boolean;
}


export class Invoice {
    _id: string;
    invoiceItems: QuoteItem[];
    summary: string;
    amount: number;
    expense: number;
    profit: number;
    flagged: boolean;
}

export class Customer {
    name: string;
    _id: string;
    address: string;
    contact: number;
    rating: number;
    facilities: string[];
    createdOn: string;
    quotations: Quote[];
    invoices: any[];
    gender: string;
    email: string;
    flagged: boolean;
    userId: string;
}
