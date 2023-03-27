const X = 'X';
const O = 'O';
const array_ = document.getElementsByClassName('box');
let utility = document.getElementsByClassName('hidden')[0];

const getCurrentBoard = () =>
{
    let arr = [];
    
    for (let i = 0; i < array_.length; i++)
    {
        arr[i] = array_[i].textContent;
    }
    
    return arr;
}

const actions = array =>
{
    let arr = [];
    
    for (let i = 0; i < array.length; i++)
    {
        if (array[i] !== X && array[i] !== O)
        {
            arr.push(i);
        }
    }
    
    return arr;
}

const checkHorizontal = array =>
{
    for (let i = 0; i < array.length; i+=3)
    {
        if ((array[i] === X || array[i] === O) && array[i] === array[i + 1] && array[i] === array[i + 2])
        {
            utility.textContent = array[i] === X ? '1' : '-1';
            return true;
        } 
    }
    
    return false;
}

const checkVertical = array =>
{
    for (let i = 0; i < array.length/3; i++)
    {
        if ((array[i] === X || array[i] === O) && array[i] === array[i + 3] && array[i] ===  array[i + 6])
        {
            utility.textContent = array[i] === X ? '1' : '-1';
            return true;
        }
    }
    
    return false;
}

const checkDiagonal = array =>
{
    if ((array[4] === X || array[4] === O) && array[0] === array[4] && array[4] === array[8])
    {
        utility.textContent = array[4] === X ? '1' : '-1';
        return true;
    }
    
    if ((array[4] === X || array[4] === O) && array[2] === array[4] && array[4] === array[6])
    {
        utility.textContent = array[4] === X ? '1' : '-1';
        return true;
    }
    
    return false;
}

const checkTie = array =>
{
    for (let i of array)
    {
        if (i !== X && i !== O)
        {
            return false;
        }
    }
    
    utility.textContent = '0';
    return true;
}

const colorDiagonal = () =>
{
    if ((array_[4].textContent === X || array_[4].textContent === O) && array_[0].textContent === array_[4].textContent && array_[4].textContent === array_[8].textContent)
    {
        array_[0].style.backgroundColor = array_[4].textContent === X ? "green" : "#6b332d";
        array_[4].style.backgroundColor = array_[4].textContent === X ? "green" : "#6b332d";
        array_[8].style.backgroundColor = array_[4].textContent === X ? "green" : "#6b332d";
    }
    
    else if ((array_[4].textContent === X || array_[4].textContent === O) && array_[2].textContent === array_[4].textContent && array_[4].textContent === array_[6].textContent)
    {
        array_[2].style.backgroundColor = array_[4].textContent === X ? "green" : "#6b332d";
        array_[4].style.backgroundColor = array_[4].textContent === X ? "green" : "#6b332d";
        array_[6].style.backgroundColor = array_[4].textContent === X ? "green" : "#6b332d";
    }
    
}

const colorHorizontal = () =>
{
    for (let i = 0; i < array_.length; i+=3)
    {
        if ((array_[i].textContent === X || array_[i].textContent === O) && array_[i].textContent === array_[i + 1].textContent && array_[i].textContent === array_[i + 2].textContent)
        {
            array_[i].style.backgroundColor = array_[i].textContent === X ? "green" : "#6b332d";
            array_[i + 1].style.backgroundColor = array_[i].textContent === X ? "green" : "#6b332d";
            array_[i + 2].style.backgroundColor = array_[i].textContent === X ? "green" : "#6b332d";
        }
    }
}

const colorVertical = () =>
{
    for (let i = 0; i < array_.length/3; i++)
    {
        if ((array_[i].textContent === X || array_[i].textContent === O) && array_[i].textContent === array_[i + 3].textContent && array_[i].textContent === array_[i + 6].textContent)
        {
            array_[i].style.backgroundColor = array_[i].textContent === X ? "green" : "#6b332d";
            array_[i + 3].style.backgroundColor = array_[i].textContent === X ? "green" : "#6b332d";
            array_[i + 6].style.backgroundColor = array_[i].textContent === X ? "green" : "#6b332d";
        }
    }
}

const colorTie = () =>
{
    let isTied = true;
    for (let i of array_)
    {
        if (i.textContent !== X && i.textContent !== O)
        {
            isTied = false;
        }
    }

    if (isTied)
    {
        for (let i = 0; i < array_.length; i++)
        {
            array_[i].style.backgroundColor = "#57531e";
        }
    }
}

const checkTerminal = array =>
{
    if (checkHorizontal(array))
    {
        colorHorizontal();
        return true;
    }

    else if (checkVertical(array))
    {
        colorVertical();
        return true;
    }

    else if (checkDiagonal(array))
    {
        colorDiagonal();
        return true;
    }

    else if (checkTie(array))
    {
        colorTie();
        return true;
    }

    return false;
}

const alpha_beta_pruning_recursive = (array, turn, alpha, beta, path) =>
{
    if (checkTerminal(array))
    {
        if (utility.textContent === '1')
        {
            utility.textContent = '0';
            return [1, path];
        }
        
        else if (utility.textContent === '-1')
        {
            utility.textContent = '0';
            return [-1, path];
        }
        
        utility.textContent = '0';
        return [0, path];
    }
    
    if (alpha[0] >= beta[0])
    {
        return turn === X ? alpha : beta;
    }
    
    for (let i of actions(array))
    {
        let arr = [...array];
        if (turn === X)
        {
            arr[i] = X;
            let a = alpha_beta_pruning_recursive(arr, O, alpha, beta, path + 1);
            if ((a[0] >= alpha[0] && a[1] < alpha[1]) || a[0] > alpha[0])
            {
                alpha = a;
                if (alpha[0] >= beta[0]){return alpha;}
            }
        }
        
        else
        {
            arr[i] = O;
            let a = alpha_beta_pruning_recursive(arr, X, alpha, beta, path + 1);
            if ((a[0] <= beta[0] && a[1] < beta[1]) || a[0] < beta[0])
            {
                beta = a;
                if (alpha[0] >= beta[0]){return beta;}
            }
        }
    }
    
    return turn === X ? alpha : beta;
}

const alpha_beta_pruning = array =>
{
    let min = [-1, 10, 10];
    let alpha = [-10, 10];
    let beta = [10, 10];
    for (let i of actions(array))
    {
        arr = [...array];
        arr[i] = O;
        let a = alpha_beta_pruning_recursive(arr, X, alpha, beta, 0);
        if ((a[0] <= min[1] && a[1] < min[2]) || a[0] < min[1])
        {
            min[0] = i;
            min[1] = a[0];
            min[2] = a[1];
        }
        
    }
    
    return min[0];
}

const move = (e) =>
{
    if (!checkTerminal(getCurrentBoard()))
    {
        if (e.currentTarget.textContent !== O && e.currentTarget.textContent !== X)
        {
            e.currentTarget.textContent = X;
            
            if (!checkTerminal(getCurrentBoard()))
            {
                array_[alpha_beta_pruning(getCurrentBoard())].textContent = O;
                checkTerminal(getCurrentBoard());
            }
        }

    }
}

for (let i of array_)
{
    i.addEventListener('click', move);
}

const clearBoard = () =>
{
    for (let i of array_)
    {
        i.textContent = ' ';
        i.style.backgroundColor = "#1a1819";
    }
}

button = document.getElementsByTagName('button')[0];
button.addEventListener('click', clearBoard);