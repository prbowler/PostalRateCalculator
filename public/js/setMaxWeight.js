function setMax() {

    let weight = document.forms["form"]["weight"];
    let mailType = document.forms["form"]["postage"].value;
    let max = 3.5;
    switch (mailType) {
        case 'stamped':
            max = 3.5;
            break;
        case 'metered':
            max = 3.5;
            break;
        case 'flats':
           max = 13;
            break;
        case 'first_class':
            max = 13;
            break;
        default:
            max = 3.5;
    }

    weight.max = max;
}
