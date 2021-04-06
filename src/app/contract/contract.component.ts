import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { QuoteDto, ContractModel } from '../models/contract.model';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractComponent {

  @Input() readonly contract: ContractModel = null;
  @Input() readonly showAvgPrice: boolean = false;

  getAvgPrice(currentPrice: number, quotes: QuoteDto[]): number {
    const quotesCount: number = quotes.length;
    let avgPriceInPercent: number = 0;

    if (quotesCount) {
      const avgTenQuotes: number = quotes.reduce((acc: number, cur: QuoteDto) => {
        return acc + cur.price * cur.volume;
      }, 0) / quotes.length;
      avgPriceInPercent = Math.round(avgTenQuotes / currentPrice * 100);
    }

    return avgPriceInPercent;
  }
}
