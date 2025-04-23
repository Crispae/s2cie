**Pattern 1**: Find the existance of two entites in the same line irrespective of orientation  
```[]*? [lemma=/cd4/] []*? [lemma=/ahr/] []*? | []*? [lemma=/ahr/] []*? [lemma=/cd4/] []*?```  

**Pattern 2**: Find two specific entites in the line with specific order  
``` []*? [entity=/N.*/] []*? [lemma=ubiquitination] []*? degradation```  

**Pattern 3**: Match words with OR
``` []*? [word=/induc.*/] []*? [word=/IkappaB|IKB|NFKBI|NF-KappaB/] []*? | []*? [word=/IkappaB|IKB|NFKBI|NF-KappaB/] []*? [word=/induc.*/] []*? ```

**Pattern 4**: In not sure about the worhd use Regex as well
```[]*? [word=/induc.*|Increased|Enhanced/] []*? [word=/IkappaB|IKB|NFKBI|NF-KappaB/] []*? | []*? [word=/IkappaB|IKB|NFKBI|NF-KappaB/] []*? [word=/induc.*|Increased|Enhanced/][]*?```
**Pattern 5**: Search phrases
```inhibition of [word=/N.*/] []*? [word=/nu.*/] ```

**Pattern 6**: Pattern with specific type
```inhibition of [entity=/B-gene/][entity=/I-gene/] []*? [word=/nu.*/] ```

**Pattern 7**: Pattern with multiple constraints
``` []*? [word="insulin"] []*? [entity=/B-gene/ & word=/gluca.*/] []*? ```

**Pattern 8**: Pattern using dependecy graph
``` ([entity=/B-gene/]) <nsubj ([tag=/V.*/]) >dobj ([entity=/B-gene/]) ```

**Pattern 9**: Using contraints with the name of entites
```([entity=/B-gene/]) <nsubj ([norm=/inhi.*/ tag=/V.*/]) >dobj ([entity=/B-gene/]) ```

**Pattern 10**: Captring negation with dependcy graph
``` ([entity=/B-drug/]) <nsubj ([tag=/V.*/]) >neg []* >dobj ([entity=/B-gene/]) ```

**Pattern 11**: Capture negation by pre-appending negated words
```([entity=/B-drug/]) <nsubj ([word=/not|don't/] [tag=/V.*/]) >dobj ([entity=/B-gene/]) ```

**Pattern 12**: adding multiple constrain in surface token with & and |
```([entity=/B-drug/]) <nsubj ([word=/not|don't/] [tag=/V.*/]) >dobj ([entity=/B-gene/ | word=/av.*/])```
```([entity=/B-drug/]) <nsubj ([word=/not|don't/] [tag=/V.*/]) >dobj ([entity=/B-gene/ & word=/av.*/])```

**Pattern 13**: Adding phrases after entity ## Adding positive lookahead
``` [word=/inhi.*/] (?= of ) []*? [entity=/B-gene/]```

**Pattern 14**: lookahead
```([entity=/B-drug/]) <nsubj ([tag=/V.*/ & norm=/suppre.*|inhibition|reduc.*|decre.*/]) >dobj ([word=/tumor/](?=/gro.*/))  ```

**Pattern 15**: Capturing the whole sentence patter
p53 leads to cell death
```[word=/p53.*/] []*? (?= /lead.*/) []*? [word=/cell.*/] (?=/death.*/) ```

**Pattern 16**: Capture the tokens with spaces and gaps between them 
```[lemma="synaptic"] []{0,2} [lemma="loss"] | [lemma="syanapses"] ```



Nice examples of lookahead https://stackoverflow.com/questions/2973436/regex-lookahead-lookbehind-and-atomic-groups

https://github.com/lum-ai/odinson/issues/321
https://github.com/BeckySharp/OdinsonWebapp

Activation glucocorticoid receptor