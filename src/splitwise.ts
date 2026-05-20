export class Splitwise {
  balances: Map<string, Map<string, number>>;

  constructor() {
    this.balances = new Map();
  }

  addExpense(paidBy: string, participants: string[], amount: number) {
    const split = parseFloat((amount / participants.length).toFixed(2));
    for (const person of participants) {
      if (person === paidBy) continue;
      if (!this.balances.has(person)) this.balances.set(person, new Map());
      const map = this.balances.get(person)!;
      map.set(paidBy, (map.get(paidBy) || 0) + split);
    }
  }

  simplifyDebts() {
    const people = Array.from(this.balances.keys());
    for (const a of people) {
      const owes = this.balances.get(a)!;
      for (const [b, amount] of owes) {
        if (this.balances.has(b) && this.balances.get(b)!.size) {
          for (const [c, amtBC] of this.balances.get(b)!) {
            if (c === a) continue;
            const min = Math.min(amount, amtBC);
            owes.set(c, (owes.get(c) || 0) + min);
            owes.set(b, owes.get(b)! - min);
            this.balances.get(b)!.set(c, amtBC - min);
          }
        }
      }
    }
  }

  showBalances() {
    for (const [person, debts] of this.balances) {
      for (const [owedTo, amount] of debts) {
        if (amount > 0) console.log(`${person} owes ${owedTo}: ₹${amount.toFixed(2)}`);
      }
    }
  }
}