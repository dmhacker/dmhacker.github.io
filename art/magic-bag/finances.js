var finances = {
  initialCosts: 0,
  seedMoney: 0,
  maintenanceCosts: 0,
  taxCosts: 0,
  rawMaterialsCost: 0,
  hardwareCost: 0,
  manufacturingCost: 0,
  researchCost: 0,
  numEmployees: 0,
  averageSalary: 0,
  averageBenefits: 0,
  numYears: 0,
  retailPrice: 0,
  renewalPrice: 0,
  renewalRate: 0,
  annualBags: 0
};

var pies = [];

function updatePage() {
  for (var index in pies) {
    var pie = pies[index];
    pie.destroy();
  }
  pies = [];

  // Set each input field to disabled and update global object
  for (var field in finances) {
    if (finances.hasOwnProperty(field)) {
      var element = $('#' + field);
      element.prop('disabled', true);
      finances[field] = parseInt(element.val(), 10);
    }
  }

  // Generate new graphs using the refreshed global object
  updateGraphs();

  // Set each input field to enabled again
  for (var field in finances) {
    if (finances.hasOwnProperty(field)) {
      var element = $('#' + field);
      element.prop('disabled', false);
    }
  }
}

function updateGraphs() {
  var annualInitialCosts = finances.initialCosts / finances.numYears;
  var annualEmployeeCosts = finances.numEmployees * (finances.averageSalary + finances.averageBenefits);
  var annualMaterialCosts = finances.annualBags * finances.rawMaterialsCost;
  var annualHardwareCosts = finances.annualBags * finances.hardwareCost;
  var annualManufacturingCosts = finances.annualBags * finances.manufacturingCost;
  var annualResearchCosts = finances.annualBags * finances.researchCost;
  var annualMaintenanceCosts = finances.maintenanceCosts;
  var annualTaxCosts = finances.taxCosts;

  pies.push(new d3pie("annualCostsPieChart", {
    "header": {
      "title": {
        "text": "Annual Costs Breakdown",
        "fontSize": 24,
        "font": "open sans"
      },
      "subtitle": {
        "text": "How extraneous funds will be used to develop our product",
        "color": "#999999",
        "fontSize": 12,
        "font": "open sans"
      },
      "titleSubtitlePadding": 9
    },
    "footer": {
      "color": "#999999",
      "fontSize": 10,
      "font": "open sans",
      "location": "bottom-left"
    },
    "size": {
      "canvasWidth": 500,
      "pieOuterRadius": "90%"
    },
    "data": {
      "sortOrder": "value-desc",
      "content": [
        {
          "label": "Initial Costs",
          "value": annualInitialCosts,
          "color": "#923e99"
        },
        {
          "label": "Salaries & Benefits",
          "value": annualEmployeeCosts,
          "color": "#ae83d5"
        },
        {
          "label": "Materials",
          "value": annualMaterialCosts,
          "color": "#ce2aeb"
        },
        {
          "label": "Hardware",
          "value": annualHardwareCosts,
          "color": "#a4a0c9"
        },
        {
          "label": "Manufacturing",
          "value": annualManufacturingCosts,
          "color": "#7c37c0"
        },
        {
          "label": "R & D",
          "value": annualResearchCosts,
          "color": "#cc9fb1"
        },
        {
          "label": "Maintenance & Customer Service",
          "value": annualMaintenanceCosts,
          "color": "#9e3fd8"
        },
        {
          "label": "Taxes",
          "value": annualTaxCosts,
          "color": "#9014e6"
        }
      ]
    },
    "labels": {
      "outer": {
        "pieDistance": 15
      },
      "inner": {
        "hideWhenLessThanPercentage": 3
      },
      "mainLabel": {
        "fontSize": 11
      },
      "percentage": {
        "color": "#ffffff",
        "decimalPlaces": 0
      },
      "value": {
        "color": "#adadad",
        "fontSize": 11
      },
      "lines": {
        "enabled": true
      },
      "truncation": {
        "enabled": true
      }
    },
    "tooltips": {
      "enabled": true,
      "type": "placeholder",
      "string": "{label}: ${value}"
    },
    "effects": {
      "pullOutSegmentOnClick": {
        "effect": "linear",
        "speed": 400,
        "size": 8
      }
    },
    "misc": {
      "gradient": {
        "enabled": true,
        "percentage": 100
      }
    }
  }));

  var annualSeedMoney = finances.seedMoney / finances.numYears;
  var annualBagProfits = finances.annualBags * finances.retailPrice;
  var annualRenewalProfits = 0;

  // Calculate the profits from people renewing the bag
  var renewalRate = finances.renewalRate / 100;
  var renewalBags = finances.annualBags * renewalRate;
  while (renewalBags > 0) {
    annualRenewalProfits += renewalBags * finances.renewalPrice;
    renewalRate -= 0.1;
    renewalBags *= renewalRate;
  }

  pies.push(new d3pie("annualProfitsPieChart", {
    "header": {
      "title": {
        "text": "Annual Profits Breakdown",
        "fontSize": 24,
        "font": "open sans"
      },
      "subtitle": {
        "text": "How much revenue our product will generate",
        "color": "#999999",
        "fontSize": 12,
        "font": "open sans"
      },
      "titleSubtitlePadding": 9
    },
    "footer": {
      "color": "#999999",
      "fontSize": 10,
      "font": "open sans",
      "location": "bottom-left"
    },
    "size": {
      "canvasWidth": 500,
      "pieOuterRadius": "90%"
    },
    "data": {
      "sortOrder": "value-desc",
      "content": [
        {
          "label": "Bag Sales",
          "value": annualBagProfits,
          "color": "#923e99"
        },
        {
          "label": "Bag Renewals",
          "value": annualRenewalProfits,
          "color": "#ae83d5"
        },
        {
          "label": "Seed Money",
          "value": annualSeedMoney,
          "color": "#9e3fd8"
        }
      ]
    },
    "labels": {
      "outer": {
        "pieDistance": 32
      },
      "inner": {
        "hideWhenLessThanPercentage": 3
      },
      "mainLabel": {
        "fontSize": 11
      },
      "percentage": {
        "color": "#ffffff",
        "decimalPlaces": 0
      },
      "value": {
        "color": "#adadad",
        "fontSize": 11
      },
      "lines": {
        "enabled": true
      },
      "truncation": {
        "enabled": true
      }
    },
    "tooltips": {
      "enabled": true,
      "type": "placeholder",
      "string": "{label}: ${value}"
    },
    "effects": {
      "pullOutSegmentOnClick": {
        "effect": "linear",
        "speed": 400,
        "size": 8
      }
    },
    "misc": {
      "gradient": {
        "enabled": true,
        "percentage": 100
      }
    }
  })); 

  var annualSales = annualSeedMoney + annualBagProfits + annualRenewalProfits;
  var annualExpenses = annualInitialCosts + annualEmployeeCosts + annualHardwareCosts 
    + annualManufacturingCosts + annualResearchCosts + annualMaintenanceCosts + annualTaxCosts;
  var annualNetProfit = annualSales - annualExpenses;
  var netProfit = annualNetProfit * finances.numYears;

  var annualPurchases = finances.annualBags;
  var annualRenewals = annualRenewalProfits /  finances.renewalPrice;
  var monthlyPurchases = ["purchases", 0.042, 0.049, 0.063, 0.110, 0.100, 0.075, 0.055, 0.047, 0.078, 0.118, 0.149, 0.114];
  var monthlyRenewals = ["renewals", 0.114, 0.042, 0.049, 0.063, 0.110, 0.100, 0.075, 0.055, 0.047, 0.078, 0.118, 0.149];

  for (var i = 0; i < 12; i++) {
    monthlyPurchases[i + 1] = Math.round(monthlyPurchases[i + 1] * annualPurchases);
    monthlyRenewals[i + 1] = Math.round(monthlyRenewals[i + 1] * annualRenewals);
  }

  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  bb.generate({
    bindto: "#monthlySalesChart",
    data: {
      x: "x",
      columns: [
        ["x", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        monthlyPurchases,
        monthlyRenewals 
      ],
      types: {
        purchases: "spline",
        renewals: "spline"
      },
      colors: {
        purchases: "purple",
        renewals: "pink"
      }
    },
    axis: {
      x: {
        tick: {
          format: function(x) {
            return months[x];
          }
        }
      }
    }
  });

  $("#annualSales").text(annualSales.toFixed(2));
  $("#annualExpenses").text(annualExpenses.toFixed(2));
  $("#annualNetProfit").text(annualNetProfit.toFixed(2));
  $("#netProfit").text(netProfit.toFixed(2));
}

updatePage();

$(document).ready(function() {
  $("#submitButton").click(updatePage);
});
