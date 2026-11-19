# 科普写作功能清单

本包拥有专业能力；宿主拥有正文、来源与作者决定。

| 动作 | 用途 | 必填参数 | 效果 |
| --- | --- | --- | --- |
| list_projects | 查找专业工程 |  | read |
| get_project | 读取固定专业工程 | object_id | read |
| save_project | 保存完整专业工程 | expected_revision, expected_sha256, operation_key, content | managed_write |
| get_source | 分块读取固定来源 | object_id, source_index | read |
| get_basis | 读取固定专业依据 | object_id, basis_index | read |
| compare_versions | 比较固定专业修订 | object_id, from_revision, to_revision | read |
| export_project | 分块导出完整专业数据 | object_id, format | read |
| build_context | 准备有界创作上下文 | object_id, goal, max_chars | read |
| create_handoff | 准备本工程AI接续 | object_id, goal | read |
| get_operation | 回读原操作 | operation_key | read |
| put_evidence | 维护固定引文 | object_id, expected_revision, expected_sha256, operation_key, evidence | managed_write |
| put_quantity | 维护带单位数量 | object_id, expected_revision, expected_sha256, operation_key, quantity | managed_write |
| remove_quantity | 移除带单位数量 | object_id, expected_revision, expected_sha256, operation_key, quantity_id | managed_write |
| put_calculation | 维护依赖计算 | object_id, expected_revision, expected_sha256, operation_key, calculation | managed_write |
| remove_calculation | 移除依赖计算 | object_id, expected_revision, expected_sha256, operation_key, calculation_id | managed_write |
| put_claim | 维护解释主张 | object_id, expected_revision, expected_sha256, operation_key, claim | managed_write |
| remove_claim | 移除解释主张 | object_id, expected_revision, expected_sha256, operation_key, claim_id | managed_write |
| put_analogy | 维护类比边界 | object_id, expected_revision, expected_sha256, operation_key, analogy | managed_write |
| remove_analogy | 移除类比边界 | object_id, expected_revision, expected_sha256, operation_key, analogy_id | managed_write |
| put_block | 维护文章段落 | object_id, expected_revision, expected_sha256, operation_key, block | managed_write |
| remove_block | 移除文章段落 | object_id, expected_revision, expected_sha256, operation_key, block_id | managed_write |
| put_note | 维护固定意见 | object_id, expected_revision, expected_sha256, operation_key, note | managed_write |
| remove_note | 移除固定意见 | object_id, expected_revision, expected_sha256, operation_key, note_id | managed_write |
| target_digest | 读取目标固定摘要 | object_id, target_kind, target_id | read |
| check_science | 检查专业关系与过期依据 | object_id | read |
| claim_basis | 核对主张依据 | object_id, evidence_ids, quantity_ids, calculation_ids | read |
| block_basis | 核对文章段落依据 | object_id, claim_ids | read |
| evaluate | 精确计算及量纲 | object_id, operand, unit | read |
| export_reading | 导出专业阅读本 | object_id | read |
| export_review | 导出完整审核本 | object_id | read |

默认流程、边界及验收见 [docs](docs/README.md)。
