import { Injectable } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContractDto, QuotesDto } from '../models/contract.model';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  getContracts$(): Observable<ContractDto[]> {
    return interval(1000).pipe(
      map(() => generateContracts())
    );
  }

  getQuotes$(): Observable<QuotesDto[]> {
    return interval(1000).pipe(
      map(() => generateQuotes())
    );
  }
}

/**
 * Generate random char in lower case for id
 * @returns char
 */
function generateChar(): string {
  const chars: string = 'abcdefghijklmnopqrstuvwxyz';
  const charsLen: number = chars.length;
  const char: string = chars.charAt(Math.floor(Math.random() * charsLen));

  return char;
}

/**
 * Generate array of contracts with length from 1 to 6 items.
 * @returns contracts: ContractDto[]
 */
function generateContracts(): ContractDto[] {
  const countContracts: number = Math.floor(Math.random() * 5 + 1);
  const res: ContractDto[] = [];

  do {
    let char: string = generateChar();
    let removed: boolean = Math.random() >= 0.5;
    let ids: string[];
    const item: ContractDto = { id: `i-${char}` };

    ids = res.map((x: ContractDto) => x.id) ;
    if (ids.includes(item.id)) {
      continue;
    }

    if (removed) {
      item.removed = removed;
    } else {
      item.name = char.toUpperCase().repeat(3);
    }

    res.push(item);
  } while (res.length < countContracts);

  return res;
}

/**
 * Generate array of quotes with length from 1 to 10 items.
 * price - random value from 1 to 100,
 * volume - random value from 1 to 6
 * @returns quotes: QuoteData[]
 */
function generateQuotes(): QuotesDto[] {
  const countQuotes: number = Math.floor(Math.random() * 9 + 1);
  const res: QuotesDto[] = [];

  do {
    let char: string = generateChar();
    const item: QuotesDto = {
      contractId: `i-${char}`,
      quote: {
        price: Math.floor(Math.random() * 99 + 1),
        volume: Math.floor(Math.random() * 5 + 1)
      }
    };


    res.push(item);
  } while (res.length < countQuotes);

  return res;
}
