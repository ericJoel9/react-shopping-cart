// ajoute le symbole dollard devant le prix
export default function formatCurrency(num){
    return "$" + Number(num.toFixed(1)).toLocaleString()+ " ";
} 