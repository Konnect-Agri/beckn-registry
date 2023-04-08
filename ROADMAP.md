# Beckn Registry for KONNECT
## Links
- [Beckn Registry README](https://github.com/beckn/registry)
- [Beckn Registry Infrastructure](https://developers.becknprotocol.io/docs/introduction/the-registry-infrastructure/)
- [Infrastructure layer Registry API specification](https://developers.becknprotocol.io/docs/infrastructure-layer-specification/registry-api-reference/)
- [GH Link for reference registry implementation](https://github.com/beckn/reference-beckn-registry)
- [Beckn Website link to a reference implementation](https://becknprotocol.io/reference-registry/)
- 

### A good introduction to the `Beckn Registry` is given in the [README](https://github.com/beckn/registry)
## To Be Implemented
A REST API with the following `endpoints`
- `/subscribe` :
	- Any network participant (BAP, BG,BPP), registers itself on the registry to perform transactions.
	- The subscription takes place with the help of a public-private key pair.
	- Details of the request and specification with relevant examples are given [here](https://developers.becknprotocol.io/docs/infrastructure-layer-specification/registry-api-reference/registry/subscribe/)
- `/on_subscribe`:
	- Participant can check subscription status using this route.
	- Deatils of the request and specification with relevant examples are give [here](https://developers.becknprotocol.io/docs/infrastructure-layer-specification/registry-api-reference/subscriber/on-subscribe/)
- `/lookup`:
	- This is used to search participants to forward request to by BG.
	- Deatils of the request and specification with relevant examples are give [here](https://developers.becknprotocol.io/docs/infrastructure-layer-specification/registry-api-reference/subscriber/lookup/)

I am not sure if we need to implement the `authentication` part of the `infrastructure layer`.
If it is required then the details can be found [here](https://developers.becknprotocol.io/docs/infrastructure-layer-specification/authentication/). 