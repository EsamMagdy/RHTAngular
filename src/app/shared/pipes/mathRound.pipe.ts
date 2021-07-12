import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'mathRound' })
export class MathRound implements PipeTransform {
  transform(value: any) {
    // if (value) return Math.round(value);
    if (value) return Math.round((parseFloat(value) + Number.EPSILON) * 100) / 100;
    return 0;
  }
}
