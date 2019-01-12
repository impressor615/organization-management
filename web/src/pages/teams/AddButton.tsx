import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment, PureComponent } from "react";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

const TEAM_SIZES: {
  [index: string]: { code: string; text: string };
} = {
  tiny: {
    code: "tiny",
    text: "5명 미만",
  },
  // tslint:disable-next-line:object-literal-sort-keys
  small: {
    code: "small",
    text: "5명 ~ 20명",
  },
  medium: {
    code: "medium",
    text: "20명 ~ 100명",
  },
  big: {
    code: "big",
    text: "100명 이상",
  },
};

interface States {
  isOpen: boolean;
  name: string;
  size: string;
}

interface Props {
  createTeam(payload: object): void;
}

class AddButton extends PureComponent<Props, States> {
  public state = {
    isOpen: false,
    name: "",
    size: "tiny",
  };

  public render() {
    const { isOpen, name, size } = this.state;
    return (
      <Fragment>
        <Button type="button" color="primary" onClick={this.onToggle}>
          <FontAwesomeIcon icon="plus" />
          <span>조직 추가</span>
        </Button>
        <CreateTeamModal
          isOpen={isOpen}
          name={name}
          size={size}
          onToggle={this.onToggle}
          onClosed={this.onClosed}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
        />
      </Fragment>
    );
  }

  private onToggle = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  }

  private onChange = (e: React.ChangeEvent) => {
    e.stopPropagation();
    const { id, value }: any = e.target;
    this.setState({
      [id]: value,
    } as Pick<States, keyof States>);
  }

  private onClosed = () => {
    this.setState({
      name: "",
      size: "tiny",
    });
  }

  private onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const { createTeam } = this.props;
    const { name, size } = this.state;
    await createTeam({ name, size });
    this.setState({ isOpen: false });
  }
}

interface CreateTeamModalProps {
  isOpen: boolean;
  name: string;
  size: string;
  onChange(e: React.ChangeEvent): void;
  onToggle(): void;
  onClosed(): void;
  onSubmit(e: React.FormEvent): void;
}
const CreateTeamModal = ({
  isOpen,
  onToggle,
  onChange,
  onClosed,
  onSubmit,
  name,
  size,
}: CreateTeamModalProps) => (
  <Modal isOpen={isOpen} toggle={onToggle} onClosed={onClosed} size="sm">
    <ModalHeader toggle={onToggle}>팀 추가</ModalHeader>
    <ModalBody>
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <Label>팀 이름</Label>
          <Input id="name" type="text" placeholder="팀 이름 입력" onChange={onChange} value={name} />
        </FormGroup>
        <FormGroup>
          <Label>팀 규모</Label>
          {
            Object.keys(TEAM_SIZES).map((sizeKey) => (
              <FormGroup check key={sizeKey}>
                <Label check>
                  <Input
                    type="radio"
                    id="size"
                    onChange={onChange}
                    value={TEAM_SIZES[sizeKey].code}
                    checked={TEAM_SIZES[sizeKey].code === size}
                  />&nbsp;
                  { TEAM_SIZES[sizeKey].text }
                </Label>
              </FormGroup>
            ))
          }
        </FormGroup>
        <ModalFooter>
          <Button color="primary" type="submit">생성</Button>
          <Button color="secondary" onClick={onToggle}>취소</Button>
        </ModalFooter>
      </Form>
    </ModalBody>
  </Modal>
);

export default AddButton;
