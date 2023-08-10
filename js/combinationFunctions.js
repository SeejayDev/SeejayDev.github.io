function productRange(a,b) {
  var prd = a,i = a;
 
  while (i++< b) {
    prd*=i;
  }
  return prd;
}


function combinations(n, r) 
{
  if (n==r || r==0) 
  {
    return 1;
  } 
  else 
  {
    r=(r < n-r) ? n-r : r;
    return productRange(r+1, n)/productRange(1,n-r);
  }
}

function getMaxGroupCombinations(num) {
  return combinations(num, 2)
}