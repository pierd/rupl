type ComparisonResult = 'match' | 'extra' | 'missing';
type Difference = {
  char: string;
  type: ComparisonResult;
};

function StringComparison({ correct, answer }: { correct: string; answer: string }) {
  const compareStrings = (str1: string, str2: string): Difference[] => {
    const m = str1.length;
    const n = str2.length;

    // Create matrix
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(null));
    const operations = Array(m + 1).fill(null).map(() => Array(n + 1).fill(null));

    // Initialize first row and column
    for (let i = 0; i <= m; i++) {
      dp[i][0] = i;
      operations[i][0] = 'delete';
    }
    for (let j = 0; j <= n; j++) {
      dp[0][j] = j;
      operations[0][j] = 'insert';
    }

    // Fill the matrix
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (str1[i - 1] === str2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1];
          operations[i][j] = 'match';
        } else {
          const min = Math.min(
            dp[i - 1][j],     // deletion
            dp[i][j - 1],     // insertion
            dp[i - 1][j - 1]  // substitution
          );
          dp[i][j] = min + 1;

          if (min === dp[i - 1][j]) operations[i][j] = 'delete';
          else if (min === dp[i][j - 1]) operations[i][j] = 'insert';
          else operations[i][j] = 'substitute';
        }
      }
    }

    // Backtrack to get the differences
    let i = m, j = n;
    const result = [];

    while (i > 0 || j > 0) {
      if (i > 0 && j > 0 && str1[i - 1] === str2[j - 1]) {
        result.unshift({
          char: str1[i - 1],
          type: 'match' as ComparisonResult
        });
        i--;
        j--;
      } else if (j > 0 && (i === 0 || dp[i][j - 1] <= dp[i - 1][j])) {
        result.unshift({
          char: str2[j - 1],
          type: 'extra' as ComparisonResult
        });
        j--;
      } else if (i > 0) {
        result.unshift({
          char: str1[i - 1],
          type: 'missing' as ComparisonResult
        });
        i--;
      }
    }

    return result;
  };

  const differences = compareStrings(correct, answer);

  const getCharStyle = (type: ComparisonResult) => {
    switch (type) {
      case 'match':
        return 'text-green-500';
      case 'extra':
        return 'text-red-500 line-through';
      case 'missing':
        return 'text-red-500';
      default:
        return '';
    }
  };

  return (
    <div className="flex flex-wrap gap-1 font-mono text-lg">
      {differences.map((diff, index) => (
        <span
          key={index}
          className={`${getCharStyle(diff.type)} font-medium`}
        >
          {diff.char}
        </span>
      ))}
    </div>
  );
};

export default StringComparison;
