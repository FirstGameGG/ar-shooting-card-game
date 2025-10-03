// Global target visibility tracker
let target_visible = {
  charaA: false,
  charaB: false,
};

// Register component for tracking target events
AFRAME.registerComponent("target-events", {
  init: function () {
    let el = this.el;

    el.addEventListener("targetFound", function () {
      target_visible[el.id] = true;
      console.log(el.id + " found");
    });

    el.addEventListener("targetLost", function () {
      target_visible[el.id] = false;
      console.log(el.id + " lost");
    });
  },
});

// Main game logic component
AFRAME.registerComponent("draw-line", {
  init: function () {
    this.Agent1 = document.querySelector("#charaAModel");
    this.Agent2 = document.querySelector("#charaBModel");
    this.ak47Model = document.querySelector("#ak47Model");
    this.famasF1Model = document.querySelector("#famasF1Model");
    this.pp19BizonModel = document.querySelector("#pp19BizonModel");
    this.m14Model = document.querySelector("#m14Model");
    this.sksType56Model = document.querySelector("#sksType56Model");
    this.vz61SkorpionModel = document.querySelector("#vz61SkorpionModel");
    this.hpDisplayA = document.querySelector("#hp-display-A");
    this.hpDisplayB = document.querySelector("#hp-display-B");
    this.dieEffectA = document.querySelector("#dieEffectA");
    this.dieEffectB = document.querySelector("#dieEffectB");
    this.shootEffectA = document.querySelector("#shootEffectA");
    this.shootEffectB = document.querySelector("#shootEffectB");
    this.gameOverDisplay = document.querySelector("#game-over");
    this.winnerDisplay = document.querySelector("#winner");
    this.healthBarA = document.querySelector("#health-bar-A .bar");
    this.healthHitA = document.querySelector("#health-bar-A .hit");
    this.healthBarB = document.querySelector("#health-bar-B .bar");
    this.healthHitB = document.querySelector("#health-bar-B .hit");
    this.statusDisplay = document.querySelector("#status-display");

    this.stats = {
      charaA: { hp: 200 },
      charaB: { hp: 200 },
    };

    // Flags to track if damage has been applied
    this.ak47Tracked = false;
    this.famasF1Tracked = false;
    this.pp19BizonTracked = false;
    this.m14Tracked = false;
    this.sksType56Tracked = false;
    this.vz61SkorpionTracked = false;
  },

  tick: function () {
    // Damage values for each weapon
    const DAMAGE_VALUES = {
      ak_47: 28,
      famas_f1: 22,
      pp_19_bizon: 15,
      m14: 100,
      sks_type_56: 24,
      vz61_skorpion: 14,
    };

    const calculateDamage = (damage) => {
      const critChance = Math.random(); // Generates a number between 0 and 1
      if (critChance <= 0.15) {
        this.statusDisplay.style.color = "#FFB81C";
        this.statusDisplay.innerHTML =
          "Weapon malfunction! No damage applied.";
        return 0; // 15% chance for malfunction
      } else if (critChance <= 0.35) {
        this.statusDisplay.style.color = "#c54";
        this.statusDisplay.innerHTML = "Critical Hit! Damage x1.5.";
        return damage * 1.5; // 20% chance for critical damage
      } else {
        this.statusDisplay.style.color = "white";
        this.statusDisplay.innerHTML = "Normal Hit.";
        return damage; // Normal damage
      }
    };

    // Function to apply damage
    const applyDamage = (character, damage) => {
      damage = calculateDamage(damage);
      character.hp = Math.max(0, character.hp - damage);
      return damage > 0; // Return true if damage was applied, false if no damage (malfunction)
    };

    // Function to show shoot effect for 2 seconds
    const triggerShootEffect = (shootEffect) => {
      shootEffect.object3D.visible = true;
      setTimeout(() => {
        shootEffect.object3D.visible = false;
      }, 2000); // Hide after 2 seconds
    };

    // Handle visibility of AgentA and weapon detection
    if (target_visible["charaA"]) {
      this.Agent1.object3D.visible = true;

      if (target_visible["famas_f1"]) {
        this.famasF1Model.object3D.visible = true;
        this.Agent1.setAttribute(
          "animation-mixer",
          "clip: tools_preview"
        );

        if (!this.famasF1Tracked) {
          const damageApplied = applyDamage(
            this.stats.charaB,
            DAMAGE_VALUES.famas_f1
          );
          this.famasF1Tracked = true;
          if (damageApplied) {
            triggerShootEffect(this.shootEffectA);
          }
        }
      } else if (target_visible["pp_19_bizon"]) {
        this.pp19BizonModel.object3D.visible = true;
        this.Agent1.setAttribute(
          "animation-mixer",
          "clip: tools_preview"
        );

        if (!this.pp19BizonTracked) {
          const damageApplied = applyDamage(
            this.stats.charaB,
            DAMAGE_VALUES.pp_19_bizon
          );
          this.pp19BizonTracked = true;
          if (damageApplied) {
            triggerShootEffect(this.shootEffectA);
          }
        }
      } else if (target_visible["ak_47"]) {
        this.ak47Model.object3D.visible = true;
        this.Agent1.setAttribute(
          "animation-mixer",
          "clip: tools_preview"
        );

        if (!this.ak47Tracked) {
          const damageApplied = applyDamage(
            this.stats.charaB,
            DAMAGE_VALUES.ak_47
          );
          this.ak47Tracked = true;
          if (damageApplied) {
            triggerShootEffect(this.shootEffectA);
          }
        }
      } else {
        // No weapon detected, reset to "eye-test" pose
        this.famasF1Model.object3D.visible = false;
        this.pp19BizonModel.object3D.visible = false;
        this.ak47Model.object3D.visible = false;
        this.Agent1.setAttribute("animation-mixer", "clip: eye_test");
        this.famasF1Tracked = false;
        this.pp19BizonTracked = false;
        this.ak47Tracked = false;
      }
    } else {
      this.Agent1.object3D.visible = false;
      this.famasF1Model.object3D.visible = false;
      this.pp19BizonModel.object3D.visible = false;
      this.ak47Model.object3D.visible = false;
    }

    // Handle visibility of AgentB and weapon detection
    if (target_visible["charaB"]) {
      this.Agent2.object3D.visible = true;

      if (target_visible["m14"]) {
        this.m14Model.object3D.visible = true;
        this.Agent2.setAttribute(
          "animation-mixer",
          "clip: tools_preview"
        );

        if (!this.m14Tracked) {
          const damageApplied = applyDamage(
            this.stats.charaA,
            DAMAGE_VALUES.m14
          );
          this.m14Tracked = true;
          if (damageApplied) {
            triggerShootEffect(this.shootEffectB);
          }
        }
      } else if (target_visible["sks_type_56"]) {
        this.sksType56Model.object3D.visible = true;
        this.Agent2.setAttribute(
          "animation-mixer",
          "clip: tools_preview"
        );

        if (!this.sksType56Tracked) {
          const damageApplied = applyDamage(
            this.stats.charaA,
            DAMAGE_VALUES.sks_type_56
          );
          this.sksType56Tracked = true;
          if (damageApplied) {
            triggerShootEffect(this.shootEffectB);
          }
        }
      } else if (target_visible["vz61_skorpion"]) {
        this.vz61SkorpionModel.object3D.visible = true;
        this.Agent2.setAttribute(
          "animation-mixer",
          "clip: tools_preview"
        );

        if (!this.vz61SkorpionTracked) {
          const damageApplied = applyDamage(
            this.stats.charaA,
            DAMAGE_VALUES.vz61_skorpion
          );
          this.vz61SkorpionTracked = true;
          if (damageApplied) {
            triggerShootEffect(this.shootEffectB);
          }
        }
      } else {
        // No weapon detected, reset to "eye-test" pose
        this.m14Model.object3D.visible = false;
        this.sksType56Model.object3D.visible = false;
        this.vz61SkorpionModel.object3D.visible = false;
        this.Agent2.setAttribute("animation-mixer", "clip: eye_test");
        this.m14Tracked = false;
        this.sksType56Tracked = false;
        this.vz61SkorpionTracked = false;
      }
    } else {
      this.Agent2.object3D.visible = false;
      this.m14Model.object3D.visible = false;
      this.sksType56Model.object3D.visible = false;
      this.vz61SkorpionModel.object3D.visible = false;
    }

    // Ensure both Agents look at each other
    let positionA = new THREE.Vector3();
    let positionB = new THREE.Vector3();

    this.Agent1.object3D.getWorldPosition(positionA);
    this.Agent2.object3D.getWorldPosition(positionB);

    this.Agent1.object3D.lookAt(positionB);
    this.Agent2.object3D.lookAt(positionA);

    // Update HP and Armor displays for both agents
    if (target_visible["charaA"]) {
      let color = "#00c04b";
      this.hpDisplayA.style.display = "block";
      const healthValueA = this.stats.charaA.hp;
      const totalHealthA = 200;
      const healthWidthA = (healthValueA / totalHealthA) * 100;
      this.healthBarA.style.width = healthWidthA + "%";

      if (healthValueA <= 66) color = "#F6412D";
      else if (healthValueA <= 132) color = "#EDC211";

      this.hpDisplayA.innerHTML = `
Agent A HP: ${healthValueA} / ${totalHealthA}
<div class="health-bar" id="health-bar-A" data-total="${totalHealthA}" data-value="${healthValueA}">
  <div class="bar" style="width: ${healthWidthA}%; background-color: ${color};"></div>
  <div class="hit"></div>
</div>
`;
    } else {
      this.hpDisplayA.style.display = "none";
    }

    if (target_visible["charaB"]) {
      let color = "#00c04b";
      this.hpDisplayB.style.display = "block";
      const healthValueB = this.stats.charaB.hp;
      const totalHealthB = 200;
      const healthWidthB = (healthValueB / totalHealthB) * 100;
      this.healthBarB.style.width = healthWidthB + "%";

      if (healthValueB <= 66) color = "#F6412D";
      else if (healthValueB <= 132) color = "#EDC211";

      this.hpDisplayB.innerHTML = `
Agent B HP: ${healthValueB} / ${totalHealthB}
<div class="health-bar" id="health-bar-B" data-total="${totalHealthB}" data-value="${healthValueB}">
  <div class="bar" style="width: ${healthWidthB}%; background-color: ${color};"></div>
  <div class="hit"></div>
</div>
`;
    } else {
      this.hpDisplayB.style.display = "none";
    }

    // Handle death and die effects
    if (this.stats.charaA.hp <= 0) {
      if (!this.dieEffectA.object3D.visible) {
        this.dieEffectA.object3D.visible = true;
        this.dieEffectA.object3D.position.copy(
          this.Agent1.object3D.position
        );
        this.Agent1.object3D.visible = false;
        this.showGameOver("Agent B Wins!");
      }
    }

    if (this.stats.charaB.hp <= 0) {
      if (!this.dieEffectB.object3D.visible) {
        this.dieEffectB.object3D.visible = true;
        this.dieEffectB.object3D.position.copy(
          this.Agent2.object3D.position
        );
        this.Agent2.object3D.visible = false;
        this.showGameOver("Agent A Wins!");
      }
    }
  },

  showGameOver: function (winnerText) {
    this.gameOverDisplay.style.display = "block";
    this.winnerDisplay.innerHTML = winnerText;
  },
});
