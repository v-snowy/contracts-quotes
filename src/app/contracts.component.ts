import { Component, OnDestroy, OnInit } from '@angular/core';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Observable, ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PriceDto, ContractMapDto, ContractDto, ContractModel, QuotesDto } from './models/contract.model';
import { ContractService } from './services/contract.service';

const MAX_QUOTES_COUNT: number = 10;

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css']
})
export class ContractsComponent implements OnInit, OnDestroy {

  get getContracts$(): Observable<ContractDto[]> {
    return this.contractService.getContracts$();
  }

  get getQuotes$(): Observable<QuotesDto[]> {
    return this.contractService.getQuotes$();
  }

  readonly data: Map<string, ContractModel> = new Map<string, ContractModel>();
  readonly destroy$: ReplaySubject<any> = new ReplaySubject<any>(1);
  showAvgPrice: boolean = false;

  constructor(private contractService: ContractService) {
  }

  ngOnInit(): void {
    this.loadContracts();
    this.loadQuotes();
  }

  ngOnDestroy(): void {
  }

  trackByFn(index: number, item: ContractMapDto): string {
    return item.key;
  }

  private loadContracts(): void {
    this.getContracts$
      .pipe(
        untilDestroyed(this),
        takeUntil(this.destroy$)
      )
      .subscribe((contracts: ContractDto[]) => {
        this.saveContracts(contracts);
      })
  }

  private loadQuotes(): void {
    this.getQuotes$
    .pipe(
      untilDestroyed(this),
      takeUntil(this.destroy$)
    )
    .subscribe((quotes: QuotesDto[]) => {
      this.saveQuotes(quotes);
    })
  }

  private saveContracts(contracts: ContractDto[]): void {
    contracts.forEach((contract: ContractDto) => {
      const { id, name, removed }: ContractDto = contract;

      if (removed) {
        this.data.delete(id);
      } else {
        this.data.set(id, { name, currentPrice: 0, quotes: [] });
      }
    });
  }

  private saveQuotes(quotes: QuotesDto[]): void {
    quotes.forEach((element: QuotesDto) => {
      const { contractId, quote }: QuotesDto = element;
      const isContractExist: boolean = this.data.has(contractId);

      if (isContractExist) {
        const contractValue: ContractDto & PriceDto = this.data.get(contractId);
        contractValue.quotes.push(quote);
        contractValue.currentPrice = quote.price;
        const len: number = contractValue.quotes.length;

        if (len > MAX_QUOTES_COUNT) {
          contractValue.quotes.splice(0, len - MAX_QUOTES_COUNT);
        }

        this.data.set(contractId, { ...contractValue })
      }
    });
  }

  stopGettingData(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
