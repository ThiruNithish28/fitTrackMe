export class UserDetails {
  userName!:string;
  email!: string;
  age!: number;
  height!:number;
  weight!: number;
  gender!: string;
  goal!: 'weight_loss' | 'fat_loss' | 'muscle_gain' | 'balance' | '';
  targetProtein!: number;
  eatenProtein!: number;
  targetCarbs!: number;
  eatenCarbs!: number;
  targetFat!: number;
  eatenFat!: number;
  targetCalories!: number;
  eatenCalories!: number;
}
