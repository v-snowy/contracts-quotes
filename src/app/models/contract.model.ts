export interface ContractDto {
  id?: string;
  name?: string;
  removed?: boolean;
}

export interface ContractMapDto {
  key: string;
  value: ContractDto;
}

export interface QuoteDto {
  price: number;
  volume: number;
}

export interface QuotesDto {
  contractId: string;
  quote: QuoteDto;
}

export interface PriceDto {
  currentPrice: number;
  quotes: QuoteDto[];
}

export type ContractModel = ContractDto & PriceDto;
