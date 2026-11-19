export const config = {
  "fields": {
    "evidence": "evidence",
    "quantity": "quantities",
    "calculation": "calculations",
    "claim": "claims",
    "analogy": "analogies",
    "block": "blocks",
    "note": "notes"
  },
  "defaults": {
    "brief": "",
    "evidence": [],
    "quantities": [],
    "calculations": [],
    "claims": [],
    "analogies": [],
    "blocks": [],
    "notes": []
  },
  "tabs": [
    "文章阅读",
    "资料与数量",
    "计算与类比",
    "主张与复核",
    "科普交付"
  ]
} as const;
