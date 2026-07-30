# ✦ Melissia Games - Enhancement & Agris System ✦




> _A comprehensive architecture for progression and enhancement._

Welcome to Melissia. Our server integrates a unique Agris system engineered to reward active gameplay and streamline your progression loop. Instead of infinite grinding, utilize your Agris points to exponentially boost silver income and enhancement probabilities, then efficiently recharge your reserves through PvP engagement.

---

## ⟡ 1. SYSTEM BUFFS: AGRIS ACTIVATION
To initialize your Agris Buffs, access the top-right interface icon ➔ **Premium Tab** ➔ **Agris Buffs**.

### `[ MODULE A: AUTO SELL TRASH LOOT ]`
* **Cost:** `1,000 Agris`
* **Duration:** `1 Hour` *(2 Hours for Premium)*
* **Effect:** Automatically liquidates trash loot into Silver during combat. Maintains optimal inventory weight.
* **Yield Bonus:** Grants an additional **+25% Silver** *(+50% for Premium)*. Bypasses drop-rate RNG and pet-tier limits for a stabilized, high-yield income.

### `[ MODULE B: ENHANCEMENT BOOST ]`
* **Cost:** `10,000 Agris` *(Instant activation)*
* **Duration:** `1 Hour` *(2 Hours for Premium)*
* **Effect:** The ultimate enhancement catalyst.
* **Yield Bonus:** Upon activation, fail-stacks gained from a failed attempt are now multiplied by 2.5. When enchanting items the number of failed stack is increased by 2.5 (Example 2FS gained per fail = 5FS added)


> 💡 **UI TELEMETRY:** The enhancement interface accurately reflects this 2.5x multiplier. A natural `10%` failstack rate will dynamically display as `25%` while active.

---


## ⟡ 2. ENHANCEMENT

Melissia games enhancement system has two unique features. One of them is the boost you get after consuming 10,000 agris (in module B above) and base x10 upgrade chance which is you always have. 

### 🛑 After Burning 10.000 Agris Enhancement Buff

Upon activation Fail-stacks gained from a failed attempt are multiplied by 2.5. When enchanting items the number of failed stack is increased by 2.5 (Example 2FS gained per fail = 5FS added)

> This buff-boost (It is also Newbie&returning player buff) will NOT multiply the available Failstack pool you will use (i.e. 100 FS will not be treated as 750 FS). Due to the system architecture, these buffs (e.g. Enhancement Boost) only multiply the amount of new failstack you pocket when you make a failed attempt. The multiplied amount is visible in the interface

---


### 🛑 THE "10x BASE" 

All items process through a **10x Base Chance Boost**, multiplying the fundamental success rate. **x10 only applies only to the base, at 0 FS**
* *Example:* A weapon with a `0.02%` standard base is scaled to **`0.20%`**. An item at `0.3%` scales to **`3.0%`**.


> ⚠️ **UI TELEMETRY WARNING:** 
> The game engine UI **does not** visually render this 10x multiplier. The math executes server-side. To calculate your true probability, multiply your Visible Base Chance by 10. 
>[Click here to calculate the true server-side enhancement success rate](https://melissiagamesinfohub.vercel.app/en/wiki/enhancement-calculator)

> **Visible Base Chance**
> ![](https://i.imgur.com/ceZ3MS3.png)
> 
> **Actual Server-Side Probability** ➔ 
> ![](https://i.imgur.com/4VvpabM.png)

![](https://i.imgur.com/ZNt7VML.png)

#### 💡💡 UNDERSTANDING X10 BASE AND HOW TO CALCULATE SUCCESS RATE AFTER FS IS USED 

> x10 only applies to the base (0 FS)

- Let's say the basic pass chance of the item at 0 FS is 0.57%. The server simply multiplies this base value by 10.

`%0.57 x 10 = %5.7`

- Let's say we used 151 FS

UI Shows Success rate `9.177`

- **Contribution of the 151 FS you are using is not the full 9.177% value you see in the interface**. Not all of this value comes from Failstack. Subtracting the base rate, we find the chance that 151 FS gives you.

`9.177% (Total) - 0.57% (Base) = 8.607`

- Actual (Server Side) Result: The server's base rate multiplied by 10 is added to chance your FS brings.

`%5.7 + %8.607 = %14.307` That is your actual success rate.

> But you don't need to do calculation by yourself. We made an app for this [Click Here to Go to App](https://melissiagamesinfohub.vercel.app/en/wiki/enhancement-calculator)

### 🔨 THE AGRIS ANVIL PITY
The hard-pity mechanic. Enhancement failures accelerate Anvil progression:

| ANVIL TARGET | MATH CALCULATION | YIELD PER FAILURE | TAPS TO PITY |
|:---|:---|:---:|:---:|
| **20** | `20 / 10` | **+ 2** | 10 |
| **25** | `25 / 10` | **+ 3** | 9 |
| **30** | `30 / 10` | **+ 3** | 10 |
| **35** | `35 / 10` | **+ 4** | 9 |
| **50** | `50 / 10` | **+ 5** | 10 |
| **75** | `75 / 10` | **+ 8** | 10 |
| **165** | `165 / 20` | **+ 8** | 21 |
| **330** | `330 / 20` | **+ 17** | 20 |
| **1000** | `1000 / 20` | **+ 50** | 20 |

> 💡 **VISUALIZATION:**
> If target Anvil is **75**, failure yields **+8** (not +1).
> ![](https://i.imgur.com/As24ty3.png) ➔ ![](https://i.imgur.com/BOdrRAn.png)
> *If target Anvil is **330**, failure yields **+17**.*

---


## ⟡ 3. CORE PVE BUFFS: AGRIS DROP TABLE EXPANSION
When Agris Fever is globally enabled and active during monster combat, the standard drop mechanics for high-tier loot undergo an exponential, compounding transformation. 

### 🌟 GOLD ACCESSORY (YELLOW ACCESSORY) BRACKET UNLOCK
Agris acts as the definitive gatekeeper for high-enhancement drop vectors. While Agris is active, the drop table dynamically expands to inject pre-enhanced endgame accessories directly into monster loot pools.

* **Legacy Baseline (Agris Disabled):** Drops are strictly hard-capped. Monsters only yield unenhanced, **PRI (+1)**, or **DUO (+2)** gold accessories.
* **Agris Enabled State:** The drop brackets scale upward, unlocking direct drop availability for:
  * **TRI (+3)**
  * **TET (+4)**
  * **PEN (+5)**

### 📈 x5 RATE MULTIPLIER
Activating Agris applies a flat **x5** directly to the base drop rate probability of all gold accessories dropping from monsters. 


## ⟡ 4. THE OPTIMIZED GAMEPLAY LOOP
Execute this 3-phase cycle for maximum efficiency:

### `[ STEP 1: PvE ]` ➔ `[ STEP 2: ENHANCE ]` ➔ `[ STEP 3: PvP ]` ➔ `[ REPEAT ]`

* **STEP 1 | LOAD WALLET (PvE):** Activate `Auto Sell Trash`. Execute mob rotations. Maintain a clean inventory and generate massive, stable Silver to fund progression.
* **STEP 2 | ENHANCE (Tap Mode):** Return to hub. Activate `Enhancement Boost`. Combine your 2.5x failstack and Anvil pity to push endgame gear.
* **STEP 3 | RECHARGE (PvP):** Depleted Agris? Queue for Arena of Solare. Global notifications track queue sizes for rapid matchmaking.