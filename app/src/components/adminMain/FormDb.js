import React from 'react';

class FormDb extends React.Component {
  constructor(props) {
    super(props);
		this.ddos = this.ddos.bind(this);
  }
  ddos(e) {
		e.preventDefault();
		let max = 1;
		let rData = this.formRandomData(max);
		for (let i=0;i<max;i++) {
			this.props.userSignupRequest(rData[i]).then(
				() => {
					this.props.addFlashMessage({
						type: 'success',
						text: 'Пользователь успешно зарегистрирован'
					})
				},
				({ response }) => {
          this.props.addFlashMessage({
            type: 'error',
            text: 'Пользователь не зарегистрирован'
          })
        }
			);
		}
    //Отправить коллбэк в компонент
		// this.getRecords();
	}
  formRandomData(n) {
    const adjectives = ["adamant", "adroit", "amatory", "animistic", "antic", "arcadian", "baleful", "bellicose", "bilious", "boorish", "calamitous", "caustic", "cerulean", "comely", "concomitant", "contumacious", "corpulent", "crapulous", "defamatory", "didactic", "dilatory", "dowdy", "efficacious", "effulgent", "egregious", "endemic", "equanimous", "execrable", "fastidious", "feckless", "fecund", "friable", "fulsome", "garrulous", "guileless", "gustatory", "heuristic", "histrionic", "hubristic", "incendiary", "insidious", "insolent", "intransigent", "inveterate", "invidious", "irksome", "jejune", "jocular", "judicious", "lachrymose", "limpid", "loquacious", "luminous", "mannered", "mendacious", "meretricious", "minatory", "mordant", "munificent", "nefarious", "noxious", "obtuse", "parsimonious", "pendulous", "pernicious", "pervasive", "petulant", "platitudinous", "precipitate", "propitious", "puckish", "querulous", "quiescent", "rebarbative", "recalcitant", "redolent", "rhadamanthine", "risible", "ruminative", "sagacious", "salubrious", "sartorial", "sclerotic", "serpentine", "spasmodic", "strident", "taciturn", "tenacious", "tremulous", "trenchant", "turbulent", "turgid", "ubiquitous", "uxorious", "verdant", "voluble", "voracious", "wheedling", "withering", "zealous"];
    const nouns = ["ninja", "chair", "pancake", "statue", "unicorn", "rainbows", "laser", "senor", "bunny", "captain", "nibblets", "cupcake", "carrot", "gnomes", "glitter", "potato", "salad", "toejam", "curtains", "beets", "toilet", "exorcism", "stick figures", "mermaid eggs", "sea barnacles", "dragons", "jellybeans", "snakes", "dolls", "bushes", "cookies", "apples", "ice cream", "ukulele", "kazoo", "banjo", "opera singer", "circus", "trampoline", "carousel", "carnival", "locomotive", "hot air balloon", "praying mantis", "animator", "artisan", "artist", "colorist", "inker", "coppersmith", "director", "designer", "flatter", "stylist", "leadman", "limner", "make-up artist", "model", "musician", "penciller", "producer", "scenographer", "set decorator", "silversmith", "teacher", "auto mechanic", "beader", "bobbin boy", "clerk of the chapel", "filling station attendant", "foreman", "maintenance engineering", "mechanic", "miller", "moldmaker", "panel beater", "patternmaker", "plant operator", "plumber", "sawfiler", "shop foreman", "soaper", "stationary engineer", "wheelwright", "woodworkers"];
    let data = new Array();
    for (let i=0;i<n;i++) {
      let name = adjectives[Math.floor(Math.random(99)*10)] + '_' + nouns[ Math.floor(Math.random(84)*10)];
      let tempData = {
        username: name,
        email: name + '@mail.com',
        password: '111',
        passwordConfirmation: '111',
        permission: 'user',
      }
      data.push(tempData);
    }
    return data;
  }
  render() {
    return (
      <button className="btn btn-danger" onClick={this.ddos}>Заполнить бд данными</button>
    )
  }
}

FormDb.proptypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired
}

export default FormDb;
