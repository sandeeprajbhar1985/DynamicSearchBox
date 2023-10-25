import utility from '../utility/utility.js';

const searchSuggestions = async (req, res) => {
    const { searchText } = req.params;

    console.log('searchText', searchText);
    utility.getSuggestions(searchText)
    .then((resolveData) => {
        // Handle successful resolution
        res.status(200).json(resolveData);
    })
    .catch((error) => {
        // Handle failure or rejection
        res.status(404).json({ message: error });
    });
};


export default {
    searchSuggestions,
}
