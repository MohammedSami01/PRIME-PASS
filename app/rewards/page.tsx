import { Metadata } from 'next';
import { Gift, Star, Zap, Trophy, Clock, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Rewards - PrimePass',
  description: 'Earn points and unlock exclusive rewards with PrimePass.',
};

const rewards = [
  {
    id: 1,
    name: '5% Off Next Booking',
    points: 100,
    icon: <Gift className="w-8 h-8 text-amber-500" />,
    description: 'Get 5% off your next event booking',
    claimed: false
  },
  {
    id: 2,
    name: 'Free Concession',
    points: 200,
    icon: <Star className="w-8 h-8 text-amber-500" />,
    description: 'Free small popcorn and drink at select venues',
    claimed: false
  },
  {
    id: 3,
    name: 'Priority Booking',
    points: 150,
    icon: <Zap className="w-8 h-8 text-amber-500" />,
    description: 'Early access to book tickets before general public',
    claimed: true
  },
  {
    id: 4,
    name: 'VIP Experience',
    points: 500,
    icon: <Trophy className="w-8 h-8 text-amber-500" />,
    description: 'Upgrade to VIP experience at select events',
    claimed: false
  }
];

export default function RewardsPage() {
  const userPoints = 350; // This would come from your user context/API
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">PrimePass Rewards</h1>
        <p className="text-xl text-muted-foreground">
          Earn points with every booking and unlock amazing rewards!
        </p>
      </div>

      {/* Points Summary */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white rounded-xl p-6 mb-12 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-semibold mb-1">Your Points Balance</h2>
            <p className="text-primary-foreground/80">Keep earning to unlock more rewards</p>
          </div>
          <div className="text-4xl font-bold">
            {userPoints.toLocaleString()} pts
          </div>
        </div>
        <div className="w-full bg-white/20 h-3 rounded-full mt-6 overflow-hidden">
          <div 
            className="bg-white h-full rounded-full transition-all duration-1000" 
            style={{ width: `${Math.min(100, (userPoints / 1000) * 100)}%` }}
          ></div>
        </div>
        <p className="text-right mt-2 text-sm text-primary-foreground/80">
          {1000 - userPoints} pts to next tier
        </p>
      </div>

      {/* How it works */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">How it works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-card p-6 rounded-lg border">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
              <span className="text-xl font-bold">1</span>
            </div>
            <h3 className="text-lg font-medium mb-2">Earn Points</h3>
            <p className="text-muted-foreground">
              Get 10 points for every ₹100 spent on event tickets and other purchases.
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg border">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
              <span className="text-xl font-bold">2</span>
            </div>
            <h3 className="text-lg font-medium mb-2">Choose Rewards</h3>
            <p className="text-muted-foreground">
              Browse and select from a variety of exciting rewards in the rewards catalog.
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg border">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
              <span className="text-xl font-bold">3</span>
            </div>
            <h3 className="text-lg font-medium mb-2">Redeem & Enjoy</h3>
            <p className="text-muted-foreground">
              Redeem your points for rewards and enjoy exclusive benefits.
            </p>
          </div>
        </div>
      </div>

      {/* Available Rewards */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Available Rewards</h2>
          <div className="text-sm text-muted-foreground">
            {rewards.filter(r => !r.claimed).length} rewards available
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {rewards.map((reward) => (
            <div 
              key={reward.id} 
              className={`border rounded-xl overflow-hidden transition-all ${reward.claimed ? 'opacity-50' : 'hover:shadow-md'}`}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-amber-50 dark:bg-amber-900/30 rounded-lg">
                    {reward.icon}
                  </div>
                  <div className="flex items-center text-sm font-medium text-amber-600 dark:text-amber-400">
                    <Star className="w-4 h-4 mr-1 fill-current" />
                    {reward.points} pts
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-1">{reward.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{reward.description}</p>
                
                <button 
                  className={`w-full py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    reward.claimed 
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 cursor-default' 
                      : userPoints >= reward.points 
                        ? 'bg-primary text-white hover:bg-primary/90' 
                        : 'bg-gray-100 text-gray-400 dark:bg-gray-800 cursor-not-allowed'
                  }`}
                  disabled={reward.claimed || userPoints < reward.points}
                >
                  {reward.claimed ? (
                    <span className="flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 mr-2" /> Claimed
                    </span>
                  ) : userPoints >= reward.points ? (
                    'Redeem Now'
                  ) : (
                    `Need ${reward.points - userPoints} more pts`
                  )}
                </button>
              </div>
              
              {reward.claimed && (
                <div className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs p-2 text-center">
                  Valid until {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-16 bg-muted/50 p-8 rounded-xl">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-2">How do I earn points?</h3>
            <p className="text-muted-foreground text-sm">
              You earn 10 points for every ₹100 spent on event tickets and other purchases. Special promotions may offer additional points.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Do my points expire?</h3>
            <p className="text-muted-foreground text-sm">
              Points expire 12 months from the date they are earned, as long as your account remains active.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I combine points with other offers?</h3>
            <p className="text-muted-foreground text-sm">
              In most cases, yes! However, some exclusions may apply. Check the terms of each offer for details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
