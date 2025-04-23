## captures subject and object relation with surface token contraints
rules:
- name: "rule1"
  label: "inhibition"
  type: event
  priority: 2
  pattern: |
    trigger = [word=/inhibit.*/]
    object = >dobj [lemma=/ubiqu.*/]
    subject = >nsubj [entity=/B-drug/]

**Event 2**:
```rules:
- name: "rule1"
  label: Chemical
  type: basic
  priority: 1
  pattern: |
    [entity=/B-drug/][entity=/I-drug/]*

- name: "rule2"
  label: inhibition
  type: event
  priority: 2
  pattern: |
    trigger = [word=/inhibit.*/]
    object = >dobj [lemma=/ubiqu.*/]
    subject: Chemical = >nsubj []
```