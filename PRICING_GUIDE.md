# YourRide Pricing & Fare Calculation Guide

## Fare Calculation Formula

YourRide uses a dynamic pricing algorithm that considers three main factors:

### 📊 Components of Fare Calculation

```
TOTAL FARE = BASE FARE + (DISTANCE × PER_KM_RATE) + (TIME × PER_MINUTE_RATE)
```

### 💰 Base Fares by Vehicle Type

| Vehicle Type | Base Fare |
|---|---|
| 🚗 YourRide Go (Car) | ₹50 |
| 🏍️ YourRide Moto | ₹20 |
| 🚕 YourRide Auto | ₹30 |

### 🛣️ Distance Rate (Per Kilometer)

| Vehicle Type | Rate/km |
|---|---|
| 🚗 YourRide Go | ₹15 |
| 🏍️ YourRide Moto | ₹8 |
| 🚕 YourRide Auto | ₹10 |

### ⏱️ Time Rate (Per Minute)

| Vehicle Type | Rate/min |
|---|---|
| 🚗 YourRide Go | ₹3 |
| 🏍️ YourRide Moto | ₹1.50 |
| 🚕 YourRide Auto | ₹2 |

## Example Calculations

### Example 1: Short City Ride (YourRide Go)
**Route**: 5 km, 15 minutes
```
Base Fare        : ₹50
Distance Charge  : 5 km × ₹15/km = ₹75
Time Charge      : 15 min × ₹3/min = ₹45
─────────────────────────────
TOTAL FARE       : ₹170
```

### Example 2: Medium Distance (YourRide Auto)
**Route**: 8 km, 20 minutes
```
Base Fare        : ₹30
Distance Charge  : 8 km × ₹10/km = ₹80
Time Charge      : 20 min × ₹2/min = ₹40
─────────────────────────────
TOTAL FARE       : ₹150
```

### Example 3: Quick Motorcycle Ride
**Route**: 3 km, 8 minutes
```
Base Fare        : ₹20
Distance Charge  : 3 km × ₹8/km = ₹24
Time Charge      : 8 min × ₹1.50/min = ₹12
─────────────────────────────
TOTAL FARE       : ₹56
```

## Rewards System Integration

### Earning Rewards 🌟

**System**: 1 Reward Point per completed ride

```
Rides Completed    → Reward Points Earned
1 ride             → 1 point
10 rides           → 10 points
100 rides          → 100 points
200 rides          → 200 points (FREE RIDE!) 🎉
```

### Redeeming Rewards 🎁

**Threshold**: 200 Reward Points = 1 Free Ride

#### Free Ride Redemption Rules:
- ✅ Redeemable anytime after reaching 200 points
- ✅ Can be used for any vehicle type
- ✅ No restrictions on distance or time
- ✅ Points reset after redemption
- ✅ Lifetime tracking of total rewards earned

#### Example Redemption Scenario:
```
User A's Journey:
├── Ride 1-50: Earns 50 points (₹2,000 in rides)
├── Ride 51-100: Earns 50 points (₹2,000 in rides)
├── Ride 101-150: Earns 50 points (₹2,000 in rides)
├── Ride 151-200: Earns 50 points (₹2,000 in rides)
│
└── At Ride 200: 
    - Total Points: 200 ✓
    - Redeems Free Ride (saves ₹150-₹200)
    - Points Reset to 0
    - Can earn next batch of rewards
```

## Dynamic Pricing Factors

### ⚠️ Future Enhancements (Coming Soon)

The fare calculation may be adjusted for:

1. **Peak Hours** - Higher demand = Slightly higher fares
2. **Weather Conditions** - Rain/snow may increase prices
3. **Traffic Density** - Congestion may affect time-based charges
4. **Distance Range** - Very long rides may have surcharges
5. **Driver Demand** - High demand areas may have surge pricing

## Fare Transparency

### What's Included in Your Fare:
✅ Driver compensation  
✅ Vehicle maintenance  
✅ Insurance coverage  
✅ Platform fee  
✅ Fuel/Operating costs  

### What's NOT Included:
❌ Additional tolls or road taxes  
❌ Parking fees  
❌ Tips (optional)  

## Price Display Timeline

### When Prices Are Shown:

1. **Vehicle Selection Screen** 📍
   - View estimates for all vehicle types
   - Based on route distance and time

2. **Confirmation Screen** ✅
   - Final price before booking
   - No surprise charges

3. **Ride Receipt** 📄
   - Actual fare charged
   - May vary ±10% based on actual route

## Payment Methods

### Current Support:
- 💵 **Cash** - Default payment method
- 🎁 **Free Ride Credits** - From reward redemption

### Planned Support:
- 💳 Credit/Debit Cards
- 📱 Digital Wallets
- 🏦 Bank Transfers
- 💱 Cryptocurrency (future)

## Common Questions

### Q: Why is my fare different from the estimate?
**A:** Estimates are based on GPS distance and traffic data. Actual fare depends on:
- Real-time traffic conditions
- Actual route taken
- Wait times
- Deviation from suggested route

### Q: Can I negotiate the fare?
**A:** No, fares are standardized and transparent. All users pay the same for the same route.

### Q: Do rewards expire?
**A:** No, reward points never expire. They persist until you choose to redeem them.

### Q: Can I transfer rewards to another user?
**A:** No, rewards are personal and cannot be transferred.

### Q: What happens if I cancel a ride?
**A:** 
- Cancel before driver arrival: No charge, no reward deduction
- Cancel after driver starts driving: Small cancellation fee may apply
- No reward points earned for cancelled rides

### Q: How do surge pricing works?
**A:** During high-demand periods (rush hour, events, rain), fares may increase by 1.2x to 1.5x. You'll see this before confirming.

## Comparisons with Other Services

| Feature | YourRide | Rapido | Uber |
|---|---|---|---|
| **Base Fare** | ₹20-50 | ₹15-40 | ₹50-75 |
| **Per KM** | ₹8-15 | ₹10-12 | ₹15-20 |
| **Rewards** | 1 pt/ride | Limited | Points system |
| **Transparency** | Full | Partial | Full |
| **Vehicle Options** | 3 | 2 | 4+ |

## Sample Rides & Costs

### Route: Delhi to Gurugram (15 km, 30 min average)

**YourRide Go** 🚗
```
Base: ₹50 + Distance: ₹225 + Time: ₹90 = ₹365
Reward Points: +1
```

**YourRide Auto** 🚕
```
Base: ₹30 + Distance: ₹150 + Time: ₹60 = ₹240
Reward Points: +1
```

**YourRide Moto** 🏍️
```
Base: ₹20 + Distance: ₹120 + Time: ₹45 = ₹185
Reward Points: +1
```

---

**Last Updated**: May 2, 2026  
**Pricing Version**: 1.0  
**Currency**: Indian Rupees (₹)  
**Status**: Active ✅
